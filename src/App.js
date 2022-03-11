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
  pricetag,
  search,
  searchOutline,
} from 'ionicons/icons';
import useContract from './hooks/useContract';
import resodeContractJSON from '../truffle/build/contracts/Resode.json';
import resodeTokenContractJSON from '../truffle/build/contracts/ResodeToken.json';
import resodeTokenSaleContractJSON from '../truffle/build/contracts/ResodeTokenSale.json';

import TokenSale from './screens/TokenSale';
import useColor from './hooks/useColor';

const App = () => {
  const [resodeContract, setContractWithWC] = useContract(resodeContractJSON);
  // const [resodeTokenContract] = useContract(resodeTokenContractJSON);
  // const [resodeTokenSaleContract] = useContract(resodeTokenSaleContractJSON);
  const [color] = useColor();

  console.log('App.js color: ', color, 'resodeContract: ', resodeContract?.options.address);

  

  return (
    <Context
      value={{
        resodeContract,
        setContractWithWC,
        color,
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
                      url: '/tabs/tokensale',
                      label: 'Token Sale',
                      component: TokenSale,
                      icon: pricetag,
                    },
                    {
                      url: '/tabs/search',
                      label: 'Search',
                      component: Main,
                      icon: search,
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
