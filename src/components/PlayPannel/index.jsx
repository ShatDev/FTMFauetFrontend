import React from 'react';

const PlayPanel = () => {
  return (
    <div class="fast-futures">
      <div class="fast-futures_main-container">
        <form class="fast-futures_content"></form>
      </div>

      <div class="fast-futures_menu vh-center" style={{ display: 'none' }}>
        <div class="fast-futures_menu_btn">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <a href="javascript:void(0)" class="fast-futures_menu_item home" data-menu-name="home">
          Home
        </a>

        <a href="javascript:void(0)" class="fast-futures_menu_item" data-menu-name="schedule">
          Schedule
          <i class="icon icon-1"></i>
        </a>

        <a href="javascript:void(0)" class="fast-futures_menu_item" data-menu-name="leaderboard">
          Leaderboard
          <i class="icon icon-2"></i>
        </a>

        <a href="javascript:void(0)" class="fast-futures_menu_item" data-menu-name="withdraw">
          Withdraw
          <i class="icon icon-3"></i>
        </a>

        <a href="javascript:void(0)" class="fast-futures_menu_item" data-menu-name="percentage">
          Percentage
          <i class="icon icon-4"></i>
        </a>

        <a href="javascript:void(0)" class="fast-futures_menu_item telegram" data-menu-name="telegram">
          <i class="icon icon-5"></i>
        </a>

        <a href="javascript:void(0)" class="fast-futures_menu_item" data-menu-name="help">
          Help
          <i class="icon icon-6"></i>
        </a>
      </div>
    </div>
  );
};

export default PlayPanel;
