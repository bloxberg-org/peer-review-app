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
    isUserLoading: PropTypes.bool.isRequired,

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
    doc.autoTable({
      startY: 50,
      html: this.tableRef.current,
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