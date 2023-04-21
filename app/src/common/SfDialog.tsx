import { DialogComponent } from '@syncfusion/ej2-react-popups';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { FallBack } from './FallBack';
import './SfDialog.css';

interface EditProps {
    isSmallScreen: boolean;
    header?: string;
    content: JSX.Element;
    height?: string;
    width?: string;
    close: (args: object) => void;
}

export class SfDialog extends React.Component<EditProps> {
    constructor(props: EditProps) {
        super(props);
        this.clickEventHandler = this.clickEventHandler.bind(this);
    }

    content() {
        return this.props.content;
    }
    clickEventHandler() {
        console.log('clickEventHandler called');
    }

    render() {
        return (
            <ErrorBoundary FallbackComponent={FallBack}>
                <div className="control-pane">
                    <div className="control-section" id="rteTools">
                        <div className="rte-control-section" />
                        <DialogComponent
                            visible={true}
                            showCloseIcon={true}
                            isModal={true}
                            width={this.props.isSmallScreen ? '100vh' : this.props.width}
                            height={
                                this.props.isSmallScreen ? '100vh' : this.props.height
                            }
                            minHeight={
                                this.props.isSmallScreen ? '100vh' : this.props.height
                            }
                            header={this.props.header}
                            allowDragging={true}
                            zIndex={100}
                            style={
                                this.props.isSmallScreen
                                    ? { marginTop: '0' }
                                    : { marginTop: '1.25rem', maxHeight: 'none' }
                            }
                            position={{ X: 'center', Y: 'top' }}
                            enableResize={true}
                            resizeHandles={['All']}
                            content={this.content.bind(this)}
                            close={this.props.close}
                        />
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}
