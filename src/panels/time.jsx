import React from "react";
import moment from "moment";
import Loading from "../panels/loading";
import { getForecast } from "../api/forecast";
import TempChart from "./chart";
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

function unpack(obj, key, subKey) {
  const result = subKey ? obj.map(v => v[key][subKey]) : obj.map(v => v[key]);
  return result;
}

export default class Timer extends React.Component {
  componentDidMount() {
    this.getForecast("tokyo");
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

  getForecast = async cityName => {
    const result = await getForecast(cityName).then(res => {
      return res.list;
    });
    this.setState({
      [cityName]: result.slice(0, 5)
    });
  };

  render() {
    if (!this.state) {
      return <Loading />;
    }

    const { tokyo } = this.state;
    const newYork = moment.utc().utcOffset(-240);
    const asiaTokyo = moment.utc().utcOffset(540);
    const hongkong = moment.utc().utcOffset(480);
    const asiaTokyoDate = new Date(asiaTokyo.format().match(/(.*)(?=\+)/g)[0]);
    const newYorkDate = new Date(newYork.format().match(/(.*)(?=\-)/g)[0]);
    const hongkongDate = new Date(hongkong.format().match(/(.*)(?=\+)/g)[0]);

    const classNewYorkClock = newYorkDate.getHours() < 12 ? "am" : "pm";
    const classTokyoClock = asiaTokyoDate.getHours() < 12 ? "am" : "pm";
    const classHongkongClock = hongkongDate.getHours() < 12 ? "am" : "pm";

    const usa = COUNTRY_CONFIG.USA;
    const jp = COUNTRY_CONFIG.JP;
    const hk = COUNTRY_CONFIG.HK;

    console.log(tokyo);
    const x = unpack(tokyo, "dt_txt");
    const y = unpack(tokyo, "main", "temp");
    console.log(y);
    return (
      <div id="time-view">
        <h1>グローバルな人材向けの時計</h1>
        <ul className="country-list">
          <li className="items">
            <a name={usa.LINK}>
              <h3 className="item-title">{usa.TITLE}</h3>
            </a>
            <div className="digital-wrapper">
              <DigitalClock
                className="digital-clock america"
                format={FORMAT}
                ticking={true}
                timezone={usa.TIMEZONE}
              />
            </div>

            {/* <div className="chart-wrapper">
              <TempChart name={'preparing...'} />
            </div> */}
            <div className="clock-wrapper">
              <Clock
                className={"clock " + classNewYorkClock}
                value={newYorkDate}
              />
            </div>
          </li>
          <li className="items">
            <a name={jp.LINK}>
              <h3 className="item-title">{jp.TITLE}</h3>
            </a>
            <div className="digital-wrapper">
              <DigitalClock
                className="digital-clock japan"
                format={FORMAT}
                ticking={true}
                timezone={jp.TIMEZONE}
              />
            </div>
            {/* <div className="chart-wrapper">
              <TempChart name={'tokyo Temp'} x={x} y={y} />
            </div> */}
            <div className="clock-wrapper">
              <Clock
                className={"clock " + classTokyoClock}
                value={asiaTokyoDate}
              />
            </div>
          </li>
          <li className="items">
            <a name={hk.LINK}>
              <h3 className="item-title">{hk.TITLE}</h3>
            </a>
            <div className="digital-wrapper">
              <DigitalClock
                className="digital-clock hongkong"
                format={FORMAT}
                ticking={true}
                timezone={hk.TIMEZONE}
              />
            </div>
            {/* <div className="chart-wrapper">
              <TempChart name={'preparing...'} />
            </div> */}
            <div className="clock-wrapper">
              <Clock
                className={"clock " + classHongkongClock}
                value={hongkongDate}
              />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
