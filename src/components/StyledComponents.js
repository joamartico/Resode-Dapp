import { IonIcon } from '@ionic/react';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';

// const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const Card = styled.div`
  width: 100%;
  /* max-width: 700px; */
  margin-top: 30px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: ${({ xOffset }) => xOffset || '0px'} ${({ yOffset }) => yOffset || '50px'} 100px 50px
    rgba(209, 224, 255, 0.5);
`;

export const Button = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  border-radius: 14px;
  border: 1px solid ${({ red, background }) => (red ? 'red' : background || COLORS.primary)};
  cursor: pointer;
  background: ${({ outlined, red, background }) => {
    if (outlined) {
      return '#0000';
    } else {
      if (red) {
        return 'red';
      } else {
        return background || COLORS.primary;
      }
    }
  }};
  &:active {
    opacity: 0.8 !important;
  }
  font-size: 20px;
  font-weight: bold;
  color: ${({ outlined, red }) => {
    if (outlined) {
      if (red) return 'red';
      else return COLORS.primary;
    } else {
      return 'white';
    }
  }};
`;

export const Padding = styled.div`
  width: 90%;
  height: 100%;
  height: fit-content;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: ${({ spaced }) => spaced && 'space-around'};
  padding-bottom: ${({ pb }) => (pb ? pb : '5%')};
  padding-top: ${({ pt }) => (pt ? pt : '5%')};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ width }) => width || '100%'};
  align-items: center;
  align-items: flex-start;
`;

export const Icon = styled(IonIcon)`
  /* --ionicon-stroke-width: 64px !important; */
  /* color: ${({ color }) => (color ? color : COLORS.primary)}; */
  color: ${({ iconColor }) => (iconColor ? iconColor : COLORS.primary)};
  font-size: ${({ size }) => size + 'px'};
  margin-right: ${({ marginRight }) => marginRight + 'px' || '5px'};
  margin-left: ${({ marginLeft }) => marginLeft + 'px' || '5px'};
  align-self: center;
`;

export const Text = styled.p`
  display: block;
  margin: auto 0;
  color: ${({ color }) => (color && color)};

`;
