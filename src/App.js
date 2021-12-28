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
import  useContract  from './hooks/useContract';
import resodeContractJSON from "../truffle/build/contracts/Resode.json";


const App = () => {
 useContract(resodeContractJSON)

  return (

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
    
  );
};

export default App;
