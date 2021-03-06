import { IonIcon, IonList } from '@ionic/react';
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
  margin-top: ${({ mt }) => mt || '5px'};
  margin-bottom: ${({ mb }) => mb || '5px'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '46px'};
  border-radius: 14px;
  border: 1px solid ${({ red, background }) => (red ? 'red' : background)};
  cursor: pointer;
  background: ${({ outlined, red, background }) => {
    if (outlined) {
      return '#0000';
    } else {
      if (red) {
        return 'red';
      } else {
        return (
          background ||
          'linear-gradient(174deg, rgba(93,152,255,1) 0%,  rgba(0,63,255,1) 80%, rgba(12,102,222,1) 100%)'
        );
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
  /* height: fit-content; */
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: ${({ spaced }) => spaced && 'space-around'};
  padding-bottom: ${({ pb }) => pb || '5%'};
  padding-top: ${({ pt }) => pt || '5%'};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: ${({ width }) => width && width};
  height: ${({ height }) => height && height};
  align-items: center;
  align-items: flex-start;
  justify-content: ${({ spaced }) => spaced && 'space-between'};
  margin-top: ${({ mt }) => mt && mt};
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
  /* margin: auto 0; */
  color: ${({ color }) => color || '#000'} !important;
  font-size: ${({ size }) => size + 'px'};
  font-weight: ${({ weight }) => weight && weight};
`;

export const Scroll = styled(IonList)`
  width: 90%;
  min-height: 100%;
  height: fit-content;
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  justify-content: ${({ spaced }) => spaced && 'space-around'};
  padding: 5% !important;
  padding-bottom: ${({ pb }) => pb || '5%'} !important;
  padding-top: ${({ pt }) => pt || '5%'} !important;
`;

export const Image = styled.img`
  width: ${({ size, w }) => w || size || '100%'};
  height: ${({ size, h }) => h || size || '100%'};
  object-fit: cover;
  display: flex;
  margin-right: ${({ mr }) => mr && mr};
  margin-left: ${({ ml }) => ml && ml};
  margin-top: ${({ mt }) => mt && mt};
  margin-bottom: ${({ mb }) => mb && mb};
`;
