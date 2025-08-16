import React, { useEffect } from 'react';
import './InvestmentPage.css';

const investmentIdeas = [
  {
    icon: '📈',
    title: 'Mutual Funds',
    description: 'Start by diversifying your portfolio with a collection of stocks and bonds managed by experts.',
    url: 'https://www.investopedia.com/terms/m/mutualfund.asp'
  },
  {
    icon: '🏢',
    title: 'Direct Stocks (Equity)',
    description: 'As you learn more, buy shares of ownership in public companies to grow your wealth.',
    url: 'https://www.investopedia.com/terms/s/stock.asp'
  },
  {
    icon: '🏦',
    title: 'Fixed Deposits (FD)',
    description: 'Balance your portfolio with a safe investment option that offers guaranteed returns.',
    url: 'https://www.investopedia.com/terms/f/fixed-deposit.asp'
  },
  {
    icon: '🥇',
    title: 'Gold Loan',
    description: 'Utilize your gold assets to secure a loan for immediate financial needs at competitive interest rates.',
    url: 'https://www.investopedia.com/terms/g/gold-loan.asp'
  }
];

const InvestmentPage = () => {
  useEffect(() => {
    document.body.classList.add('investment-theme');
    return () => {
      document.body.classList.remove('investment-theme');
    };
  }, []);

  return (
    <div className="investment-page-card">
      <div className="investment-header">
        <h1>Your Investment & Financial Journey</h1>
        <p>A step-by-step guide to growing and leveraging your assets.</p>
      </div>
      <div className="timeline-container">
        {investmentIdeas.map((idea, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-icon">{idea.icon}</div>
            <div className="timeline-content">
              <h2>{idea.title}</h2>
              <p>{idea.description}</p>
              <a 
                href={idea.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="learn-more-btn"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPage;