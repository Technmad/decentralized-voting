import "../styles/globals.css";
//internal imports
import { VotingProvider } from "../context/Voter";
import NavBar from "../components/NavBar/NavBar";

const MyApp = ({ Component, pageProps }) => {
  return (
    <VotingProvider>
      {/* <NavBar /> */}
      <Component {...pageProps} />
    </VotingProvider>
  );
};

export default MyApp;
