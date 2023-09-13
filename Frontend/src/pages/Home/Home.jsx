import React from 'react'
import './home.css'
import { NavLink } from 'react-router-dom';
export default function Home() {
  return (
    <div className="home-container overflow-auto">
      <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Techtribe
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Techtribe is a social media application. This project is a Mern
            stack project. In this application, you can create an account,
            follow other accounts, delete your followers from the follower list,
            share a post, delete the shared post, write a comment on the post,
            reply to a written comment, delete your written comments, report
            someone else's post or comment, chat live with other accounts, chat
            with your correspondent. If you follow the account and they follow
            you from it, you can see whether they are online.
        </p>
        <NavLink to={'/auth/login'}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Get started!
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </NavLink>
      </div>
      <div className="follow-instagram">
        <i className="fab fa-instagram"></i>
        <div>
          <div className="title">
            Don't forget to follow <b>@akhundov_ziya</b> on Instagram!
          </div>
          <a target="_blank" href="https://instagram.com/akhundov_ziya">
            Follow
          </a>
        </div>
      </div>
      <div className="follow-linkedin">
        <i className="fab fa-linkedin"></i>
        <div>
          <div className="title">
            Don't forget to follow <b>@ziya-akhundov</b> on Linkedin!
          </div>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/ziya-akhundov-b69132242/"
          >
            Follow
          </a>
        </div>
      </div>
      <div className="follow-github">
        <i className="fab fa-github"></i>
        <div>
          <div className="title">
            Don't forget to follow <b>@ZiyaAkhundov</b> on Github!
          </div>
          <a target="_blank" href="https://github.com/ZiyaAkhundov">
            Follow
          </a>
        </div>
      </div>
    </div>
  );
}
