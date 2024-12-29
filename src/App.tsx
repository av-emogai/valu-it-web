import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

//Get the image from src folder 
import splashImage from "./assets/imgs/cover/splash.png";
import logo from "./assets/imgs/logo/logo_horizontal.png";

import "./assets/js/jquery-3.2.1.min.js";
import "./assets/js/jquery.countdown.min.js";
import "./assets/js/modernizr-touch-events.js";
import "./assets/js/bootstrap.min.js";

import "./contactme/js/weakmap-polyfill.min.js";
import "./contactme/js/formdata.min.js";
import "./contactme/js/bootstrap-datepicker.min.js";
import "./contactme/js/bootstrap-datepicker-lang/en.js";
import "./contactme/js/jquery.timepicker.min.js";
		//<!--[if lt IE 9]><script src="contactme/js/EQCSS-polyfills-1.7.0.min.js"></script><![endif]-->
import "./contactme/js/select2.full.min.js";
import "./contactme/js/select2-lang/en.js";
import "./assets/js/jonny-1.2.js";
import "./contactme/js/EQCSS-1.7.0.js";//Needs to come after select2
import "./contactme/js/contactme-1.4.js";//Needs to come after select2


function App() {
  const countdownDate = new Date("2025-03-10T09:00:00").getTime();
  const [message, setMessage] = useState<string | null>(null);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = countdownDate - now;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  };//~calculateTimeLeft

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  useEffect(() => {

    const timer = setInterval(() => {
     setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Initialize Select2 dropdowns
   (window as any).$ = $; // Ensure jQuery is globally available
   (window as any).jQuery = $;
   $(".contactMe select").select2({
     minimumResultsForSearch: -1,
     placeholder: "Kind of pass",
     allowClear: true,
   });

     
     return () => clearInterval(timer);
   }, []);//~useEffect

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      sector: formData.get("sector") as string,
      passrequested: formData.get("passrequested") as string,
    };

    // Call the addToWaitlist function
    addToWaitlist(data);

    // Set the thank-you message
    setMessage("Thank you, we will keep you posted!");
  }; //~handleSubmit

  const addToWaitlist = (data: {
    username: string;
    email: string;
    sector: string;
    passrequested: string;
  }) => {
    client.models.Waitlist.create(data);
    
  }; //~addToWaitlist

  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,800');
      </style>
      <section className="jonny">
        <div className="infos">
          <img src={splashImage} alt="Cover" />
          <div className="contain">
            <div>
              <div>
              <img
                src={logo} className="logo" alt="Logo" />
              <h1 className="title">LAUNCH PARTY IS COMING SOON...</h1>
              <div className="countdown">
                <div className="days">
                  <div>{timeLeft.days}</div>
                  <span>days</span>
                </div>
                <div className="hours">
                  <div>{timeLeft.hours}</div>
                  <span>hours</span>
                </div>
                <div className="minutes">
                  <div>{timeLeft.minutes}</div>
                  <span>minutes</span>
                </div>
                <div className="seconds">
                  <div>{timeLeft.seconds}</div>
                  <span>seconds</span>
                </div>
              </div>
               {/* Buttons Section */}
              <div className="buttons centered">
                <a className="icon icon-video sky-blue share-btn"  
                 data-toggle="modal" data-target="#popup1">What's cooking?</a>
              </div>
              
              <a
                href="https://www.google.com/maps/place/102+Charlton+St"
                target="_blank"
                rel="noopener noreferrer"
                className="address"
              >
                102 Charlton St<br />
                NEW YORK, NY
              </a>
              </div> 
            </div>
          </div>
        </div>
        <div className="form">
          <div><div>
          <h3>
            JOIN OUR PARTY!<br />
            Sign up for early access and product updates
          </h3>
          <form className="contactMe small"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <section> 
            <div className="form-row">
              <div className="title">Your name</div>
              <input type="text" name="username" placeholder="Your name" className="field" required />
            </div>
            <div className="form-row">
              <div className="title">Your e-mail</div>
              <input type="email" name="email" placeholder="Your e-Mail" className="field" required />
            </div>
            <div className="form-row">
              <div className="title">Your business area</div>
              <input type="text" name="sector" placeholder="Your business interest"  className="field" />
            </div>
            <div className="form-row">
              <div className="title">Select kind of pass</div>
              <select title="Kind of pass" name="passrequested" data-displayname="Kind of pass" className="field">
                    <option></option> {/* Empty option for placeholder */}
                    <option value="Owner">Business Owner</option>
										<option value="Investor">Investor</option>
										<option value="Elite">Elite Owner/Investor</option>
							 </select>
            </div>
             <div className="msg">{message}</div>
             <button className="btn" type="submit" data-sending="Sending...">Notify me!</button>
             </section>
          </form>
          </div>
          </div>
        </div>
      </section>

    
      
		<section id="popup1" className="modal customModal fade" tabIndex={-1} role="dialog">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					
					<div>
						<iframe title="Demo" className="video" id ="demo_video" src="https://www.youtube.com/embed/jTVnBdY_lSs?rel=0&amp;autoplay=1&amp;loop=1&amp;controls=0&amp;showinfo=0&amp;mute=0&amp;playlist=jTVnBdY_lSs" frameBorder="0"></iframe>
					</div>
					<div className="buttons centered bottom-0 ">
						<a href="#" className="red" data-dismiss="modal">CLOSE</a>
					</div>
				</div>
			</div>
		</section>
    <section id="share-plugin-content" className="j-hide">
			<div className="addthis_inline_share_toolbox"></div>
		</section>
    </div>
  );//~return
  }; //~App

export default App;
