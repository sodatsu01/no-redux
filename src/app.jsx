import React from 'react';
import {Store} from './Store';

function App() {
  const {state, dispatch} = React.useContext(Store);

  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  }

  const toggleFavAction = episode => {
    const episodeInFavourites = state.favourites.includes(episode);
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    }
    if(episodeInFavourites) {
      const favouritesWithoutEpisode = state.favourites.filter(fav => fav.id !== episode.id)
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favouritesWithoutEpisode
      };
    }
    return dispatch(dispatchObj)
  }

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  })

  return (
    <React.Fragment>
      {console.log(state)}
      <header className='header'>
        <div className="header">
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episodes</p>
        </div>
        <div>
          Favourite(s) {state.favourites.length}
        </div>
      </header>
        <section className="episode-layout">
          {state.episodes.map(episode => {
            return (
              <section className= "episode-box" key={episode.id}>
                <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`}/>
                <div>
                  <section>
                    <div>
                      <button type="button" onClick={() => toggleFavAction(episode)}>Fav</button>
                      Season: {episode.season} Number: {episode.number}
                    </div>
                  </section>
                </div>
              </section>
            )
          })}
        </section>
    </React.Fragment>
  );
}

export default App;
