import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import globalContext from "./../../context/global/globalContext";
import LoadingScreen from "../../components/loading/LoadingScreen";

import socketContext from "../../context/websocket/socketContext";
import { CS_FETCH_LOBBY_INFO } from "../../pokergame/actions";
import "./ConnectWallet.scss";

import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
// import { sepolia } from "thirdweb/chains";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: "21843849a520f4a3d4f3414213f06ecd",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
];


const ConnectWallet = () => {

  const { setWalletAddress, setChipsAmount } = useContext(globalContext);

  const { socket } = useContext(socketContext);
  const navigate = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  useEffect(() => {
    if (socket !== null && socket.connected === true) {
      const walletAddress = query.get("walletAddress");
      const gameId = query.get("gameId");
      const username = query.get("username");
      if (walletAddress && gameId && username) {
        console.log(username);
        setWalletAddress(walletAddress);
        socket.emit(CS_FETCH_LOBBY_INFO, {
          walletAddress,
          socketId: socket.id,
          gameId,
          username,
        });
        console.log(CS_FETCH_LOBBY_INFO, {
          walletAddress,
          socketId: socket.id,
          gameId,
          username,
        });
        navigate("/play");
      }
    }
  }, [socket]);

  return (
    <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={wallets}
        // accountAbstraction={{
        //   chain: sepolia,
        //   factoryAddress: "YOUR_FACTORY_ADDRESS",
        //   gasless: true,
        // }}
        theme={"dark"}
        connectModal={{ size: "wide" }}
      />
    </ThirdwebProvider>
  );

  // return (
  //   <>
  //     <LoadingScreen />
  //   </>
  // );
};

export default ConnectWallet;
