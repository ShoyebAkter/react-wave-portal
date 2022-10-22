import React,{useEffect, useState} from "react";
import './App.css';
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json"

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
  const contractAddress="0x2f87af686031bb4fb75227b4757204940524d027"
  const contractABI=abi.abi;
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const connectWallet=async()=>{
    try{
      const ethereum=await getEthereumObject();
      const account=await ethereum.request({ method: "eth_requestAccounts"});
      if(!ethereum){
        alert("Get metamask");
      }
      console.log("My account is",account[0])
      setCurrentAccount(account[0])
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    // const fetchAccount= async() => {
    //   const account = await findMetamaskAccount();
    //   if (account !== null) {
    //     setCurrentAccount(account);
    //   }
    //   console.log(account);
    // }
    // fetchAccount()
    checkIfWalletIsConnected();
  }, []);
  
  const wave =async () => {
    try{
      const {ethereum}=window;
      console.log(ethereum);
      if(ethereum){
        const provider=new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const wavePortalContract=new ethers.Contract(contractAddress,contractABI,signer);
        console.log(provider,signer,wavePortalContract);
        

        const waveTxn=await wavePortalContract.wave();
        console.log("Mining..",waveTxn.hash);

        await waveTxn.wait();
        console.log("Mining..",waveTxn.hash);
        let count=await wavePortalContract.getTotalWaves();
        console.log("Total wave count...",count);
        count=await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...",count.toNumber());
      }else{
        console.log("Ethereum object doesn't exist");
      }
    }catch(error){
      console.log(error);
    }
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
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
