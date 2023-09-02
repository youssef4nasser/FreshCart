import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider';
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import styles from './Home.module.css';
import Mainslider from '../Mainslider/Mainslider';

export default function Home() {
  return <>
    <Mainslider />
    <CategorySlider />
    <FeatureProducts />
  </>
}
