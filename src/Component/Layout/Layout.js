import React from 'react';
import Auxillary from '../../HOC/Auxillary/Auxillary';

const Layout = (props) => {
    return (
        <Auxillary>
        <div>ToolBar, Side Drawer, BackDrop</div>
        <main>
            {props.children}
        </main>
        </Auxillary>
    );
} ;

export default Layout;