import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  return (
    <>
      <div className="row mt-4">
        <div className="col-12 ">
          <div className="our-team">
            <div className="picture">
              <img
                className="img-fluid"
                src="https://picsum.photos/130/130?image=1027"
              />
            </div>
            <div className="team-content">
              <h3 className="name">Michele Miller</h3>
              <h4 className="title">michele.miller@gmail.com</h4>
            </div>
            <ul className="social">
              <li aria-hidden></li>

              <li>
                <a href="/profile" aria-hidden="true">
                  View Account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
