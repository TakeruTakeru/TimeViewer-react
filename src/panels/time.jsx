import React from "react";
import { render } from "react-dom";
import moment from "moment";
import Clock from "react-clock";
import DigitalClock from "react-live-clock";
import { Select } from "antd";
import "../style/time-viewer.css";
import "antd/dist/antd.css";

const FORMAT = "YYYY年 M月 Do a h時mm分ss秒";
const Option = Select.Option;
const COUNTRY_CONFIG = {
  USA: {
    TITLE: "AMERICA NEWYORK",
    TIMEZONE: "America/New_York",
    LINK: "america-newyork"
  },
  JP: {
    TITLE: "JAPAN TOKYO",
    TIMEZONE: "Asia/Tokyo",
    LINK: "japan-tokyo"
  },
  HK: {
    TITLE: "HONG KONG",
    TIMEZONE: "Asia/Shanghai",
    LINK: "hong-kong"
  }
};

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

  jumpLink = e => {
      
  };

  render() {
    if (!this.state) {
      return <div className="loading">Loading...</div>;
    }
    const { gtc } = this.state;
    const newYork = moment.utc().utcOffset(-240);
    const asiaTokyo = moment.utc().utcOffset(540);
    const asiaTokyoDate = new Date(asiaTokyo.format().match(/(.*)(?=\+)/g)[0]);
    const newYorkDate = new Date(newYork.format().match(/(.*)(?=\-)/g)[0]);

    const classNewYorkClock = newYorkDate.getHours() < 12 ? "am" : "pm";
    const classTokyoClock = asiaTokyoDate.getHours() < 12 ? "am" : "pm";


    const usa = COUNTRY_CONFIG.USA;
    const jp = COUNTRY_CONFIG.JP;
    const hk = COUNTRY_CONFIG.HK;

    return (
      <div id="time-view">
        <h1>グローバルな人材向けの時計</h1>
        <div className="select-box">
          <Select
            placeholder="Choose Timezone"
            style={{ width: 200 }}
            size={"large"}
            onSelect={this.jumpLink}
          >
            <Option value={usa.LINK}>Usa</Option>
            <Option value={jp.LINK}>Japan</Option>
            <Option value={hk.LINK}>Hong kong</Option>
          </Select>
        </div>
        <ul className="country-list">
          <li className="items">
            <a name={usa.LINK}>
              <h3 className="item-title">{usa.TITLE}</h3>
            </a>
            <DigitalClock
              className="digital-clock america"
              format={FORMAT}
              ticking={true}
              timezone={usa.TIMEZONE}
            />
            <div className="clock-wrapper">
              <Clock className={"clock "+ classNewYorkClock} value={newYorkDate} />
            </div>
          </li>
          <li className="items">
            <a name={jp.LINK}>
              <h3 className="item-title">{jp.TITLE}</h3>
            </a>
            <DigitalClock
              className="digital-clock japan"
              format={FORMAT}
              ticking={true}
              timezone={jp.TIMEZONE}
            />
            <div className="clock-wrapper">
              <Clock className={"clock "+ classTokyoClock} value={asiaTokyoDate} />
            </div>
          </li>
          <li className="items">
            <a name={hk.LINK}>
              <h3 className="item-title">{hk.TITLE}</h3>
            </a>
            <DigitalClock
              className="digital-clock hongkong"
              format={FORMAT}
              ticking={true}
              timezone={hk.TIMEZONE}
            />
            <div className="clock-wrapper">
              <Clock className={"clock "+ "miracle-clock"} value={asiaTokyoDate} />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
