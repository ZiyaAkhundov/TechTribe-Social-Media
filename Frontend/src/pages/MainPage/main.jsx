import {React,useEffect,useState} from 'react'
import "../../assets/main-css/carousel.css";
import "../../assets/main-css/index.css"
import "../../assets/main-css/navbar-main.css"
import "../../assets/main-css/cs-library.css"
import logo from "../../assets/image/Programmerslogo.png";
import $ from 'jquery';
import Swal from 'sweetalert2';
export default function main() {
    useEffect(() => {
        const root = document.documentElement;
        const marqueeElementsDisplayed = parseInt(getComputedStyle(root).getPropertyValue("--marquee-elements-displayed"));
        const marqueeContent = document.querySelector("ul.marquee-content");
    
        root.style.setProperty("--marquee-elements", marqueeContent.children.length);
    
        for (let i = 0; i < marqueeElementsDisplayed; i++) {
          marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        }
      }, []);
    
      useEffect(() => {
        $(document).ready(function () {
          var hamburger = $('.hamburger-init');
          hamburger.on('click', function () {
            $('.container').toggleClass('hamburger-guide');
            $(this).toggleClass('active');
          });
        });
    
        $(".btn-sign-up").click(function () {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Try again later'
          });
        });
      }, []);

      const [speech, setSpeech] = useState(false);
const [transcript, setTranscript] = useState('');

const handleTextSpeechClick = () => {
  setSpeech(true);
  const recognition = new window.webkitSpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "en-EN";

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    setTranscript(transcript);
  });

  if (speech) {
    recognition.start();
  }
};

useEffect(() => {
  if (speech) {
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "en-EN";

    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setTranscript(transcript);
    });

    recognition.start();
  }
}, [speech]);

  return (
    <>
    <section id="navigation-bar">
        <nav className="ps-d-flex px-5">
            <div className="logo ps-d-flex ps-justify-content-between ps-align-items-center ps-p-4">
                    <div>
                        <a href="index.html"><img src={logo} alt=""/></a>
                    </div>
                    <div className="nav-hamburger">
                        <div className="hamburger-init">
                            <span className="bar top-bar"></span>
                            <span className="bar middle-bar"></span>
                            <span className="bar bottom-bar"></span>
                        </div>
                    </div>
            </div>
            <div className="header-nav-menu ps-d-flex ps-w-100">
                <div className="directions ps-d-flex ps-align-items-center">
                    <ul className="ps-d-flex ps-align-items-center ps-mb-0">
                        <li className="ps-d-flex ps-justify-content-center ps-align-items-center ps-l">
                            <a href="" className="ps-text-decoration-none ps-p-4 ps-color-black ps-font-w600 ps-nav-item">Proqramlama Dilləri</a>
                            <div className="submenu">
                                <div>
                                    <ul className="ps-d-flex">
                                        <li className="ps-l1">
                                            <h1 className="ps-size-15 ps-color-dg ps-font-w600 ps-p-2">HTML, CSS, BOOTSTRAP</h1>
                                            <div className="ps-mt-2">
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">HTML öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">CSS öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">BOOTSTRAP öyrən</a>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h1 className="ps-size-15 ps-color-dg ps-font-w600 ps-p-2">JAVASCRIPT</h1>
                                            <div className="ps-mt-2">
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Javascript öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Jquery öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">React öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">AngularJS öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">JSON öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">AJAX öyrən</a>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h1 className="ps-size-15 ps-color-dg ps-font-w600 ps-p-2">Proqramlaşdırma</h1>
                                            <div className="ps-mt-2">
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Python öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Java öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">C öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">C++ öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">C# öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">R öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Kotlin öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Go öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Django öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">TypeScript öyrən</a>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h1 className="ps-size-15 ps-color-dg ps-font-w600 ps-p-2">Server</h1>
                                            <div className="ps-mt-2">
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">SQL öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">MySQL öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">PHP öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">ASP öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Node.js öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Raspberyy Pi öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Git öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">MongoDB öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">AWS Cloud öyrən</a>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h1 className="ps-size-15 ps-color-dg ps-font-w600 ps-p-2">XML</h1>
                                            <div className="ps-mt-2">
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XML öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XML Ajax öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XML DOM öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XML DTD öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XML Schema öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XML XSLT öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XML XPath öyrən</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">XQuery öyrən</a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="ps-d-flex ps-justify-content-center ps-align-items-center ps-l">
                            <a href="" className="ps-text-decoration-none ps-p-4 ps-color-black ps-font-w600 ps-nav-item">Resurslar</a>
                            <div className="submenu">
                                <div>
                                    <ul className="ps-d-flex">
                                        <li className="ps-l1">
                                            <h1 className="ps-size-15 ps-color-dg ps-font-w600 ps-p-2">Resurslar</h1>
                                            <div className="ps-mt-2">
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Bloq</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Xəbərlər</a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="ps-d-flex ps-justify-content-center ps-align-items-center ps-l">
                            <a href="" className="ps-text-decoration-none ps-p-4 ps-color-black ps-font-w600 ps-nav-item">Referanslar</a>
                            <div className="submenu">
                                <div>
                                    <ul className="ps-d-flex">
                                        <li className="ps-l1">
                                            <div className="ps-mt-2">
                                            <h1 className="ps-size-15 ps-color-dg ps-font-w600 ps-p-2">Referanslar</h1>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">HTML</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">CSS</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">JavaScript</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Server</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Java</a>
                                                </p>
                                                <p>
                                                    <a href="" className="ps-text-decoration-none">Python</a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>  
                </div>
                <div className="nav-right ps-p-2 ps-d-flex ps-align-items-center">
                    <ul className="ps-mb-0 ps-d-flex ps-align-items-center px-0">
                        <li>
                            <a href="" className="ps-text-decoration-none ps-p-2  ps-border-r20 ps-bg-g ps-white ps-px-3 ps-mx-1">Vebsayt yaradın</a>
                        </li>
                        <li>
                            <a href="" className="btn ps-mx-1">Daxil ol</a>
                        </li>
                        <li>
                            <div className="ps-border-darkgary ps-height-25" ></div>
                        </li>
                        <li>
                            <button type='button' className="btn-sign-up ps-mx-1">Hesab yarat</button>
                        </li>
                        <li>
                            <ul className="ps-mb-0">
                                <li className="ps-d-flex ps-justify-content-center ps-align-items-center ">
                                    <div className="home-intro-btn ps-d-flex ps-justify-content-end ps-align-items-center">
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider"></span>
                                        </label>
                                        <div className="ps-relative">
                                        <button id="translate" className="ps-mx-2"><i className="fa-solid fa-earth-americas"></i></button>
                                        <div id="translation"></div>
                                    </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul> 
                </div>
            </div>
        </nav>
    </section>
    <div className="home-intro">
        <div className="home-intro-context">
                <h1 className="home-intro-context-title">Bizimlə öyrən və proqramçı ol.</h1>
                <div className="searchbar">
                    <div className="searchbar-wrapper">
                        <div className="searchbar-left">
                            <div className="search-icon-wrapper">
                                <span className="search-icon searchbar-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                
                        <div className="searchbar-center">
                            <div className="searchbar-input-spacer"></div>
                            
                            <input type="text" id="searchbarSearch" className="searchbar-input" defaultValue={transcript} maxLength="2048" name="q" autoCapitalize="off" autoComplete="off" title="Search" role="combobox" placeholder="Search Programmers School" />
                        </div>
                
                        <div className="searchbar-right" onClick={handleTextSpeechClick}>
                            <svg className="voice-search" id="textspeech" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fontSize: '21px' }}>
                                <path fill="#004aad" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z">
                                </path>
                                <path fill="#004aad" d="m11 18.08h2v3.92h-2z"></path>
                                <path fill="#004aad" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z">
                                </path>
                                <path fill="#004aad" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="home-intro-text">
                    <p>Bacarıqlarınızı kəşf edin və inkişaf elətdirin.</p>
                </div>
                <div className="home-intro-carousel">
                    <div className="marquee">
                        <ul className="marquee-content">
                          <li><i className="devicon-github-original colored"></i></li>
                          <li><i className="devicon-codepen-plain colored"></i></li>
                          <li><i className="fab fa-dev"></i></li>
                          <li><i className="devicon-react-original colored"></i></li>
                          <li><i className="devicon-vuejs-plain colored"></i></li>
                          <li><i className="devicon-angularjs-plain colored"></i></li>
                          <li><i className="devicon-nodejs-plain-wordmark colored"></i></li>
                          <li><i className="devicon-jquery-plain-wordmark colored"></i></li>
                          <li><i className="fab fa-aws"></i></li>
                          <li><i className="devicon-html5-plain colored"></i></li>
                          <li><i className="devicon-css3-plain colored"></i></li>
                          <li><i className="devicon-javascript-plain colored"></i></li>
                          <li><i className="devicon-bootstrap-plain colored"></i></li>
                          <li><i className="devicon-microsoftsqlserver-plain-wordmark"></i></li>
                          <li><i className="devicon-postgresql-plain-wordmark colored"></i></li>
                          <li><i className="devicon-mysql-plain colored"></i></li>
                          <li><i className="devicon-java-plain colored"></i></li>
                          <li><i className="devicon-kotlin-plain colored"></i></li>
                          <li><i className="devicon-go-original-wordmark colored"></i></li>
                          <li><i className="devicon-typescript-plain colored"></i></li>
                          <li><i className="devicon-php-plain colored"></i></li>
                          <li><i className="devicon-raspberrypi-line colored"></i></li>
                          <li><i className="devicon-git-plain-wordmark colored"></i></li>
                          <li><i className="devicon-mongodb-plain-wordmark colored"></i></li>
                        </ul>
                      </div>
                </div>
        </div>
    </div>
    <footer className="h-footer">
        <div className="h-footer-main ps-d-flex">
                <div className="f-copyright">
                    <p className="ps-font-w600">Copyright © 2023 Programmers <span className="ps-l-c">School</span></p>
                </div>
                <div className="h-footer-social">
                    <ul className="ps-mb-0 ps-d-flex">
                        <li>
                            <a href="">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                    </ul>
                </div>

        </div>
    </footer>
    </>
  )
}
