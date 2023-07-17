import './App.css';
import { useEffect, useRef, useState } from 'react';
import logo from './assets/logo.svg';
import profilePic from './assets/ProfileImg.jpg';
import { musics } from './musics';
import PlayBtn from './assets/play.svg';
import stopBtn from './assets/stop.svg';
import prevBtn from './assets/previous.svg';
import PauseBtn from './assets/pause.svg';
import nextBtn from './assets/next.svg';



function App() {
  const nickName = 'Rochel';




  const audioRef = useRef(null);
  const progressRef = useRef(null);


  let intervalProgress = null;


  const [playing, setPlaying] = useState(false);

  const [musicData, setMusicData] = useState(musics[0]);




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


  useEffect(() => {
    console.log(musicData);
    audioRef.current.src = musicData.url;

    if (playing) {
      audioRef.current.play()
    }

  }, [musicData])


  function handlePrev(id) {
    console.log(id);

    if (id === 1) {
      setMusicData(musics[musics.length - 1])

      return
    }

    setMusicData(musics[id - 2])



  }





  function handleNext(id) {
    console.log(id);

    if (id === musics.length) {
      setMusicData(musics[0])

      return
    }

    setMusicData(musics[id])

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

    setMusicData(music);
    setPlaying(true);
    audioRef.current.play();

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
          <strong>{musicData.title}</strong>
          <p>{musicData.artist}</p>
        </div>

        <div className='containerControls'>

          <div className='controls-music'>

            <img className='stopBtn' onClick={() => handleStop()} src={stopBtn} alt='botao para parar a musica' />
            <img className='prevBtn' onClick={() => handlePrev(musicData.id)} src={prevBtn} alt='botao para voltar a musica' />

            <img className='playBtn' onClick={() => handlePlayPause()} src={playing ? PauseBtn : PlayBtn} alt='botao play/pause' />

            <img className='nextBtn' onClick={() => handleNext(musicData.id)} src={nextBtn} alt='botao para passar a musica' />

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
