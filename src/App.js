import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  useMoralis } from 'react-moralis';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Main from './screens/Main';
import Tabs from './components/Tabs';
import {
  bookmark,
  bookmarkOutline,
  home,
  homeOutline,
  person,
  personOutline,
  search,
  searchOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import ResodeContractJSON from '../truffle/build/contracts/Resode.json';


const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, Moralis } = useMoralis();
  const [resodeContract, setResodeContract] = useState();


  async function loadContracts(web3Provider) {
    const networkId = await web3Provider.eth.net.getId();
    const networkData = await ResodeContractJSON.networks[networkId];

    if (networkData) {
      const resodeContract = await new web3Provider.eth.Contract(
        ResodeContractJSON.abi,
        networkData.address
      );

      await setResodeContract(resodeContract);
    } else {
      alert('The network you choose with ID: ' + networkId + ' is not available for this dapp');
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      loadContracts(new Moralis.Web3(window.ethereum));
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    } else {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        enableWeb3({ provider: 'walletconnect' }).then(() => loadContracts(Moralis.web3))
        
      }
    }
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Context
      value={{
        resodeContract,
      }}
    >
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route
              path="/tabs"
              render={() => (
                <Tabs
                  tabs={[
                    {
                      url: '/tabs/main',
                      label: 'Main',
                      component: Main,
                      icon: home,
                    },
                    {
                      url: '/tabs/search',
                      label: 'Search',
                      component: Main,
                      icon: search,
                    },
                    {
                      url: '/tabs/favs',
                      label: 'Favs',
                      component: Main,
                      icon: bookmark,
                    },
                    {
                      url: '/tabs/user',
                      label: 'User',
                      component: Main,
                      icon: person,
                    },
                  ]}
                />
              )}
            />
            <Route exact path="/" render={() => <Redirect to="/tabs/main" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;
