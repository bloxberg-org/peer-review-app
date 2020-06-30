import Button from 'components/Button';
import CardWrapper from 'components/CardWrapper';
import Context from 'components/Context';
import FormField from 'components/FormField';
import Loader from 'components/Loader';
import { getCurrentAccount } from 'connection/reviewConnection';
import React, { useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { addAuthor, requestAccessToken, requestOrcidEmails, requestOrcidName } from 'utils/authors';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0px 32px;
  `;

const FormWrapper = styled.div`
  flex: 1;
  `;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  `;

const OrcidIcon = styled(({ className }) => {
  return <img className={className} id="orcid-id-icon" src="https://orcid.org/sites/default/files/images/orcid_24x24.png" width="24" height="24" alt="ORCID iD icon" />;
})`
    display: block;
    margin: 0 .5em 0 0;
    padding: 0;
    float: left;
 `;

const OrcidText = styled.span`
  color: green;
`;

const OrcidButton = styled(({ onClick, className }) => {
  return (
    <button id="connect-orcid-button" onClick={onClick} className={className}>
      <OrcidIcon /> Import ORCiD info
    </button>
  );
})`
  border: 1px solid #D3D3D3;
  padding: .3em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 3px #999;
  cursor: pointer;
  color: #999;
  font-weight: bold;
  font-size: .8em;
  line-height: 24px;
  vertical-align: middle;

  &:hover{
    border: 1px solid #338caf;
    color: #338caf;
  }
`;

export default function App() {
  const [account, setAccount] = useState(0);
  const [orcid, setOrcid] = useState();
  const [accessToken, setAccessToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { fortmaticMetadata } = useContext(Context);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      email: fortmaticMetadata ? fortmaticMetadata.email : null
    }
  });
  const history = useHistory();
  console.log(fortmaticMetadata);

  // Autofill user address
  useEffect(() => {
    getCurrentAccount().then((address) => {
      setAccount(address);
    });
  }, []);

  const saveAuthor = (author) => {
    console.log(author);
    // Set orcid Id and access-token to author object if logged in with orcid.
    if (orcid)
      author.orcid = orcid;
    if (accessToken)
      author.orcidAccessToken = accessToken;
    setIsLoading(true);
    addAuthor(author)
      .then((response) => {
        console.log(response);
        setAccount(author._id);
        history.push('/', author._id);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  /**
   * Function to let user log in to ORCiD and to get the authentication code.
   * The code later can be used to retrieve access token.
   * Opens up a popup to orcid login. Polls the popup until successful login and redirect to redirect_uri. 
   * @returns {Promise} resolving to a 6 letter authentication code
   */
  const signInToOrcid = () => {
    return new Promise((resolve, reject) => {
      const CLIENT_ID = process.env.REACT_APP_ORCID_CLIENT_ID;
      const redirect_uri = window.location.origin + '/orcid'; // Set redirect. It is going to be closed immediately anyway.
      // const scope = '/read-limited'; // Requires Member API
      const scope = '/authenticate';
      const url = `https://sandbox.orcid.org/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&scope=${scope}&redirect_uri=${redirect_uri}`;

      // from https://stackoverflow.com/questions/37425721/3-legged-oauth-with-react-and-redux
      const popup = window.open(url, 'orcidLogin', 'height=600,width=450');
      if (popup) popup.focus();

      // Poll every 0.5 sec. Will throw cross-origin errors in orcid.org. Resolves or rejects when back to same domain.
      const pollTimer = window.setInterval(() => {
        if (!!popup && popup.location.href.indexOf(redirect_uri) !== -1) {
          window.clearInterval(pollTimer);
          const code = new URLSearchParams(popup.location.search).get('code');
          popup.close();
          if (!code)
            reject('Could not login');
          resolve(code);
        }
      }, 500);
    });
  };

  const orcidFill = () => {
    setIsLoading(true);
    signInToOrcid()
      .catch(err => {
        console.error('Couldnt get the auth code \n', err);
        return Promise.reject(); // Break the chain.
      })
      .then(code => {
        console.log('Got the auth code: ', code);
        return requestAccessToken(code);
      })
      .then(json => {
        console.log('Got access token!');
        console.log(json);
        setOrcid(json.orcid);
        setAccessToken(json.access_token);
        return Promise.all([requestOrcidName(json.orcid, json.access_token), requestOrcidEmails(json.orcid, json.access_token)]);
      })
      .then(promises => {
        console.log(promises);
        let namesObj = promises[0];
        let emails = promises[1].emails;
        console.log(namesObj);
        if (emails.length > 0)
          reset({ ...namesObj, email: emails[0].email });
        else
          reset(namesObj);
        setIsLoading(false);
      });
  };

  if (isLoading)
    return <Loader />;

  return (
    <CardWrapper title='Register'>
      <Wrapper>
        <div style={{ marginTop: '16px' }}>
          {
            orcid
              ? <div><OrcidIcon /><OrcidText>Orcid ID: {orcid}</OrcidText></div>
              : <OrcidButton onClick={orcidFill} />
          }
        </div>
        <FormWrapper>
          <form onSubmit={handleSubmit(saveAuthor)}>
            <FormField
              type="text"
              placeholder="First name"
              name="firstName"
              title="First Name"
              errors={errors.firstName}
              register={register({ required: true, maxLength: 80 })} />
            <FormField
              type="text"
              placeholder="Last Name"
              name="lastName"
              title="Surname"
              errors={errors.lastName}
              register={register({ required: true, maxLength: 100 })} />
            <FormField
              type="text"
              placeholder="E-mail"
              name="email"
              title="Email"
              errors={errors.email}
              disabled={fortmaticMetadata}
              register={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <FormField
              type="text"
              placeholder="0x...."
              name="_id"
              title="Ethereum Address"
              errors={errors._id}
              register={register({ required: true })} value={account}
              disabled />
            <ButtonWrapper>
              <Button primary>Submit</Button>
            </ButtonWrapper>
          </form>
        </FormWrapper>
      </Wrapper>
    </CardWrapper>
  );
}
