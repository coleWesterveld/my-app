import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/css/styles.css'; // Don't forget to import the CSS


interface SidebarProps {
    theme: string;
}

const SidebarMenu: React.FC<SidebarProps> = ({ theme }) => {

    return (
        <Sidebar
            style={{
                //position: 'fixed',
                top: '80px', // Push the sidebar below the navbar
                height: '100vh', // Ensures full screen height
                width: '250px',  // Adjust width to your preference
                position: 'fixed', // Ensure it's fixed on the left side
                //top: 0, // Start at the top of the page
                left: 0, // Ensure it's on the left side
                zIndex: 1000, // Make sure it sits on top of other content
                backgroundColor: theme === 'dark' ? '#666' : '#ddd', // Match theme background
                color: theme === 'dark' ?'#fff' : '#111'
            }}
        >
            <Menu
                style={{

                
                //position: 'fixed',
                top: '80px', // Push the sidebar below the navbar
                height: '100vh', // Ensures full screen height
                width: '250px',  // Adjust width to your preference
                position: 'fixed', // Ensure it's fixed on the left side
                //top: 0, // Start at the top of the page
                left: 0, // Ensure it's on the left side
                zIndex: 1000, // Make sure it sits on top of other content
                backgroundColor: theme === 'dark' ? '#111' : '#ccc', // Match theme background
            }}
            >
                {/*TODO: this could use some styling*/}
                <SubMenu label="Recent Articles">
                <MenuItem 
                > Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <SubMenu label="Similar Articles">
                <MenuItem 
                > Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <SubMenu label="Same Topic">
                <MenuItem 
                > Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default SidebarMenu;