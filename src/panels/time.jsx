import React from "react";
import { render } from "react-dom";
import moment from "moment";
import Clock from "react-clock";

const FORMAT = "YYYY年 M月 Do a h時mm分ss秒";

export default class Timer extends React.Component {
  componentDidMount() {
    moment.locale("ja");
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock = () => {
    this.setState({
      gtc: moment.utc
    });
  };

  render() {
    if (!this.state) {
      return <div>Loading...</div>;
    }
    const { gtc } = this.state;
    const newYork = moment().utcOffset(-240);
    const asiaTokyo = moment().utcOffset(540);
    const asiaTokyoDate = new Date(asiaTokyo.format().match(/(.*)(?=\+)/g)[0]);
    const newYorkDate = new Date(newYork.format().match(/(.*)(?=\-)/g)[0]);
    return (
      <div>
        アメリカ: {newYork.format(FORMAT)}
        <br />
        <Clock value={newYorkDate} />
        日本: {asiaTokyo.format(FORMAT)}
        <br />
        <Clock value={asiaTokyoDate} />
        香港: ---
      </div>
    );
  }
}
