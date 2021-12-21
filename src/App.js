import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useMoralis } from 'react-moralis';
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
import { useContract } from './hooks/useContract';
import { loadContract } from './helpers/loadContract';


const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, Moralis } = useMoralis();
  const [resodeContract, setResodeContract] = useState();

  async function getContract() {
    // await enableWeb3();
    const contract = await loadContract(new Moralis.Web3(window.ethereum));
    await setResodeContract(contract);
  }
  async function getContractWithoutMetamask() {
    // await enableWeb3({ provider: 'walletconnect' });
    const contract = await loadContract(new Moralis.Web3('https://speedy-nodes-nyc.moralis.io/73323dda20b1c4a5c3605eb4/eth/rinkeby'));
    await setResodeContract(contract);
  }

  useEffect(() => {
    if (window.ethereum == "imposible") {
      getContract();
    } else {
      getContractWithoutMetamask();
    }
  }, [isAuthenticated, isWeb3Enabled]);

  if(!resodeContract) return null

//  useContract()



  return (
    <Context
      value={{
        resodeContract,
        setResodeContract,
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
            <Route render={() => <Redirect to="/tabs/main" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;
