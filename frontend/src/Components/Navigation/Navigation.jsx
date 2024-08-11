import React from "react";
import styled from "styled-components";
import { menuItems } from "../../utils/menuItems";
import avatar from "../../img/avatar.jpg";
import { signout } from "../../utils/icons";

function Navigation() {
  return (
    <NavStyled>
      <div className="user--pic">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>Mike</h2>
          <p>Your money</p>
        </div>
      </div>
      <ul className="menu--items">
        {menuItems.map((item) => {
          return (
            <li key={item.id}>
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom--nav">
        <li>{signout} Sign Out</li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    

    .user--pic {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 80%;
      object-fit: cover;
    }

    .text {
      margin: 10px;
    }
  }

  

    li {
      display: flex;
      align-items: center;
      margin: 10px 0;

      i { /* Targeting the icon element */
        margin-right: 8px; /* Adjust this value as needed */
        font-size: 24px; /* Adjust size as needed */
      }
    
  
`;

export default Navigation;
