import "../styles/globals.css";
//internal imports
import { VotingProvider } from "../context/Voter";
import NavBar from "../components/NavBar/NavBar";

const MyApp = ({ Component, pageProps }) => {
  return (
    <VotingProvider>
      <div>
        <NavBar />
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </VotingProvider>
  );
};

export default MyApp;
