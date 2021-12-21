import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/colors';
import useGlobalState from '../hooks/useGlobalState';
import { isMobile } from '../helpers/isMobile';

const Categories = ({ categories }) => {
  const { setSelectedCategory, selectedCategory } = useGlobalState();

  return (
    <ScrollX>
      {categories?.map(category => (
        <Tab
          key={category.categoryId}
          active={selectedCategory.id == category.categoryId}
          onClick={() =>
            setSelectedCategory({ id: category.categoryId, name: category.categoryName })
          }
        >
          {category.categoryName}
        </Tab>
      ))}
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </ScrollX>
  );
};

const ScrollX = styled.div`
  overflow: scroll;
  width: 100%;
  padding-left: 5%;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  margin-top: ${() => (isMobile ? '100px' : '3%')};
  z-index: 9999999999999;
`;
export default Categories;

const Tab = styled.div`
  background: ${({ active }) => (active ? COLORS.primary : 'none')};
  color: ${({ active }) => (active ? '#fff' : COLORS.primary)};
  border: 1px solid ${COLORS.primary};
  padding: 5px 15px;
  border-radius: 50px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
`;
