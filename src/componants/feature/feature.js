import React from 'react';
import FeatureItem from './featureItem.js';
import ChatIcon from '../../assets/icon-chat.png';
import MoneyIcon from '../../assets/icon-money.png';
import SecurityIcon from '../../assets/icon-security.png';

import './feature.css';

function Feature() {
    return (
        <section class="features">
            <h2 class="sr-only">Features</h2>
            <FeatureItem
            imageUrl={ChatIcon}
            imageAlt="Chat Icon"
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
            />
            <FeatureItem
                imageUrl={MoneyIcon}
                imageAlt="Money Icon"
                title="More savings means higher rates"
                description="The more you save with us, the higher your interest rate will be!"
            />
            <FeatureItem
                imageUrl={SecurityIcon}
                imageAlt="Security Icon"
                title="Security you can trust"
                description="We use top of the line encryption to make sure your data and money is always safe."
            />
        </section> 
    );
}

export default Feature;