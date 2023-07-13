import './App.css';
import { useRef, useState } from 'react';
import logo from './assets/logo.svg';
import profilePic from './assets/ProfileImg.jpg';
import { musics } from './musics';
import PlayBtn from './assets/play.svg';
import stopBtn from './assets/stop.svg';
import prevBtn from './assets/previous.svg';
import PauseBtn from './assets/pause.svg';
import nextBtn from './assets/next.svg';
import { listagem } from './components/ListagemUrls';


function App() {
  const nickName = 'Rochel';
  const music1 = 'https://storage.googleapis.com/pedagogico/frontend-files/aula-react-referencias-eventos/The%20Von%20Trapp%20Family%20Choir%20-%20Alge.mp3';




  const audioRef = useRef(null);
  const progressRef = useRef(null);


  let intervalProgress = null;


  const [playing, setPlaying] = useState(false);
  const [musicName, setMusicName] = useState();
  const [artistName, setArtistName] = useState();
  const [musicUrl, setMusicUrl] = useState(music1);



  function handlePlayPause() {
    intervalProgress = setInterval(() => {
      if (audioRef.current.paused) {
        clearInterval(intervalProgress)
      }
      const duration = audioRef.current.duration / 60;
      const currentProgres = ((audioRef.current.currentTime / 60) * 100) / duration;

      progressRef.current.style.width = `${currentProgres}%`
    }, 1000)

    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true)
      return
    }

    audioRef.current.pause();
    setPlaying(false);
  }





  function handleStop() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlaying(false);
  }


  function editName() {
    {
      musics.map((item) => {
        if (item.url === musicUrl) {
          setArtistName(item.artist);
          setMusicName(item.title)
        }
      })
    }

  }


  function handlePrev(list) {
    let musicInPlay = 0;

    {
      musics.map((item) => {
        if (item.url === musicUrl) {
          musicInPlay = item.id
        }

      })
    }

    editName();




    if (musicInPlay == 1) {
      audioRef.current.src = (listagem[3]);
      setMusicUrl(listagem[3])
    }

    if (musicInPlay == 2) {
      audioRef.current.src = (listagem[0]);
      setMusicUrl(listagem[0])
    }

    if (musicInPlay == 3) {
      audioRef.current.src = (listagem[1]);
      setMusicUrl(listagem[1])
    }

    if (musicInPlay == 4) {
      audioRef.current.src = (listagem[2]);
      setMusicUrl(listagem[2])
    }


    setPlaying(true);
    audioRef.current.play()



  }

  function handleNext(list) {
    let musicInPlay = 3;
    {
      musics.map((item) => {
        if (item.url === musicUrl) {
          return musicInPlay = item.id
        }
      })
    }


    if (musicInPlay == 1) {
      audioRef.current.src = (listagem[1]);
      setMusicUrl(listagem[1])
    }

    if (musicInPlay == 2) {
      audioRef.current.src = (listagem[2]);
      setMusicUrl(listagem[2])
    }

    if (musicInPlay == 3) {
      audioRef.current.src = (listagem[3]);
      setMusicUrl(listagem[3])
    }

    if (musicInPlay == 4) {
      audioRef.current.src = (listagem[0]);
      setMusicUrl(listagem[0])
    }

    editName()
    audioRef.current.play();
    setPlaying(true)
  }

  function handleSelect(music) {

    intervalProgress = setInterval(() => {
      if (audioRef.current.paused) {
        clearInterval(intervalProgress)
      }
      const duration = audioRef.current.duration / 60;
      const currentProgres = ((audioRef.current.currentTime / 60) * 100) / duration;

      progressRef.current.style.width = `${currentProgres}%`
    }, 1000)

    audioRef.current.src = (music.url)

    setMusicName(music.title);
    setArtistName(music.artist);

    audioRef.current.play();
    setPlaying(true);
  }


  return (
    <div className="container">

      <header>
        <div className='logo'>
          <img src={logo} alt='logotipo do aplicativo' />
        </div>

        <div className='user-profile'>
          <img src={profilePic} alt='imagem do usuario' />
          <p>Bem vindo, {nickName}!</p>
        </div>
      </header>

      <main>

        <div>
          <h2>The best play list</h2>

          <ul>

            {musics.map((music) =>
              <li key={music.id} onClick={() => handleSelect(music)}>

                <img src={music.cover} />
                <strong>{music.title}</strong>
                <p>{music.description}</p>
                <audio>{music.url}</audio>
              </li>
            )}

          </ul>
        </div>

      </main>

      <section className='player-music'>

        <div className='info-music'>
          <strong>{musicName}</strong>
          <p>{artistName}</p>
        </div>

        <div className='containerControls'>

          <div className='controls-music'>

            <img className='stopBtn' onClick={() => handleStop()} src={stopBtn} alt='botao para parar a musica' />
            <img className='prevBtn' onClick={() => handlePrev()} src={prevBtn} alt='botao para voltar a musica' />

            <img className='playBtn' onClick={() => handlePlayPause()} src={playing ? PauseBtn : PlayBtn} alt='botao play/pause' />

            <img className='nextBtn' onClick={() => handleNext()} src={nextBtn} alt='botao para passar a musica' />

          </div>

          <div className='containerProgress'>

            <audio ref={audioRef} />

            <strong className='start'></strong>
            <div className='containerLine'>
              <div className='progressLine'></div>
              <div className='progressLineColor' ref={progressRef} ></div>
            </div>
            <strong className='end'></strong>

          </div>


        </div>


      </section >


    </div >
  );
}

export default App;
