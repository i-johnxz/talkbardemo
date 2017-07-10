import React, { Component } from 'react';
import { Icon, Tabs, WhiteSpace, SearchBar, Flex, Carousel, TabBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import styles from './IndexPage.css';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import ListView from '../components/ListView';


const TabPane = Tabs.TabPane;
const FlexItem = Flex.Item;


const makeTabPane = (key) => {
  return (
    <TabPane tab={`选项${key}`} key={key}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
        {`选项${key}内容`}
      </div>
    </TabPane>
  );
};

const makeMultiTabPane = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(makeTabPane(i));
  }
  return result;
};

class MobileDemo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [
        img1,
        img2,
        img3,
      ],
      initialHeight: 200,
      selectedTab: 'redTab',
      hidden: false,
    };
  }
  componentDidMount() {
  }
  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    const { data } = this.state;
    return (
      <div>
        <Flex>
          <FlexItem style={{ width: '5rem', flex: 'auto' }}><SearchBar placeholder="搜索" /></FlexItem>
          <FlexItem>上海<Icon type="down" /></FlexItem>
        </Flex>
        <Carousel
          className={styles.mycarousel}
          autoplay
          infinite
          selectedIndex={1}
          swipeSpeed={35}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {data.map(ii => (
            <a href="#" key={ii} style={hProp}>
              <img
                src={ii}
                alt="icon"
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
              />
            </a>
          ))}
        </Carousel>
        <WhiteSpace />
        <Flex>
          <FlexItem style={{ position: 'relative' }}>
            <img src={img5} alt="icon" style={{ width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', top: '0.5rem', left: '1rem' }}>
              <h4 className={styles.whitefont}>LIKE</h4>
              <h4 className={styles.whitefont}>你会喜欢</h4>
            </div>
          </FlexItem>
          <FlexItem style={{ position: 'relative' }}>
            <img src={img6} alt="icon" style={{ width: '100%', height: '100%', position: 'relative' }} />
            <div style={{ position: 'absolute', top: '0.5rem', left: '1rem' }}>
              <h4 className={styles.whitefont}>NEW</h4>
              <h4 className={styles.whitefont}>最新活动</h4>
            </div>
          </FlexItem>
        </Flex>
        <WhiteSpace />
        <Tabs defaultActiveKey="0">
          <TabPane tab={'本周热门活动'} key={0} />
          <TabPane tab={'附近的活动'} key={1} />
        </Tabs>
        <ListView />
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            icon={<Icon type="koubei-o" size="md" />}
            selectedIcon={<Icon type="koubei" size="md" />}
            title="发现"
            key="发现"
            badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          />
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '0.44rem',
                  height: '0.44rem',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '0.44rem',
                  height: '0.44rem',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat',
                }}
              />
            }
            title="大咖"
            key="大咖"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          />
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="我的"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          />
        </TabBar>
      </div>
    );
  }
}

const MobileDemoWrapper = createForm()(MobileDemo);
export default connect()(MobileDemoWrapper);
