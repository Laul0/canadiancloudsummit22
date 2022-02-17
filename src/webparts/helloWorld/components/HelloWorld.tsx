import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IHelloWorldState } from './IHelloWorldState';

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      collapse: true
    };
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld} data-test-id="helloWorld-wp">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>

              <button className={styles.button} onClick={this.displayDescription} data-test-id="helloWorld-wp-button">
                <span className={styles.label}>Learn more</span>
              </button>

              <div className={this.state.collapse ? styles.close : styles.open} data-test-id="helloWorld-wp-desc">
                <p className={styles.description}>{escape(this.props.description)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private displayDescription = () => {
    if (this.state.collapse) {
      this.setState({ collapse: false });
    } else {
      this.setState({ collapse: true });
    }
  }
}
