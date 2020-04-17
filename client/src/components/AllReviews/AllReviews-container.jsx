import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from 'prop-types';
import React from 'react';
import '../../assets/fonts/js/Muli-bold';
import '../../assets/fonts/js/Muli-normal';
import logo from '../../assets/logo2.png';
import { getAllBlockchainReviews, getAllDatabaseReviews } from '../../utils/review';
import Loader from '../Loader';
import AllReviewsView from './AllReviews-view';

export default class AllReviewsContainer extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isReviewsLoading: true,
      DBreviews: [],
      blockchainReviews: []
    };
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.fetchAllReviews().then(reviews => {
      console.log('Reviews are here!');
      console.log(reviews);
      this.setState({ DBreviews: reviews[0], blockchainReviews: reviews[1], isReviewsLoading: false });
    });
  }

  fetchAllReviews = () => {
    let address = this.props.user._id;
    return Promise.all([getAllDatabaseReviews(address), getAllBlockchainReviews()]);
  }

  savePDF = () => {
    let { firstName, lastName, email } = this.props.user;
    const doc = new jsPDF();
    // doc.addFileToVFS('muli-normal.ttf', muliNormal)
    // doc.addFont(muliNormal, 'muli', 'normal')
    // doc.setFont('muli', 'normal')
    doc.setFontSize(10);
    doc.setFont('Muli');
    var myImage = new Image();
    myImage.src = logo;
    doc.addImage(myImage, 'PNG', 10, 20, 48, 15);
    doc.text(firstName + ' ' + lastName, 200, 20, 'right');
    doc.text(email, 200, 25, 'right');
    let { columns, rows } = doc.autoTableHtmlToJson(this.tableRef.current); // Extract the html table.

    // Each element has format: { rowSpan: 1, colSpan: 1, styles: null, content: "ID" }
    // Need to pass content only to let autoTable calculate widths.
    let rawColumn = columns.map((columnElement) => {
      return columnElement.content;
    });
    rawColumn.push('ID'); // Add ID Column
    let rawColumns = [rawColumn]; // Wrap in an array. Head expects 2D array as input.

    // Calculate 2D row content array.
    let rawRows = rows.map((row) => {
      let newRow = row.map((rowElement) => {
        return rowElement.content;
      });
      newRow.push(''); // Add 4th row for the ID link.
      return newRow;
    });

    // Add review IDs and the link to the pdf.
    // columns.push({ rowSpan: 1, colSpan: 1, styles: null, content: "ID" })
    console.log(rawColumns);
    console.log(rawRows);
    doc.autoTable({
      head: rawColumns,
      body: rawRows,
      bodyStyles: { minCellWidth: 18 }, // Avoid narrow cell because of empty string when newRow.push('').
      didDrawCell: (data) => { // Add the ID link.
        if (data.column.index === 3 && data.cell.section === 'body') {
          let i = data.row.index;
          let id = this.state.blockchainReviews[i].id; // Get the id of the review.
          var x = data.cell.x;
          var y = data.cell.y + data.cell.height / 2 + 1; // Does not align well. +1 as workaround.
          doc.textWithLink(id, x, y, { url: `${window.location.origin}/Reviews/${id}` });
        }
      },
      startY: 50,
      styles: {
        font: 'Muli'
      },
      headStyles: {
        fillColor: [164, 5, 123],
        font: 'Muli',
        fontSize: 14,
      },
    });
    // doc.save('bloxberg-peer-reviews.pdf');
    doc.output('dataurlnewwindow');

  }

  render() {
    console.log(this.props.user)
    if (this.state.isReviewsLoading) {
      return (<Loader />);
    }
    return (
      <AllReviewsView {...this.props} {...this.state} savePDF={this.savePDF} tableRef={this.tableRef} />
    );
  }
}