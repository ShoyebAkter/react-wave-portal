import React,{useEffect, useState} from "react";
import './App.css';
const getEthereumObject=()=>window.ethereum;

const findMetamaskAccount=async()=>{
  try {
    const ethereum = getEthereumObject();
    
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  
}
export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");

  /*
   * The passed callback function will be run when the page loads.
   * More technically, when the App component "mounts".
   */
  useEffect(()=>{
    const fetchAccount= async() => {
      const account = await findMetamaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
      }
      console.log(account);
    }
    fetchAccount()
  }, []);
  
  const wave = () => {
    
  }
  
  return (  
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
