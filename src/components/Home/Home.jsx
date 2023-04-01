import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider';
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import styles from './Home.module.css';

export default function Home() {
  return <>
  <CategorySlider />
    <FeatureProducts />
  </>
}
