import { ChatEngine } from 'react-chat-engine'
import ChatFeed from "./components/ChatFeed";
import './App.css';
import LoginForm from './components/LoginForm';


const App= () => {
    if(!localStorage.getItem("username")) return <LoginForm/>
    return(
        <div>
       <ChatEngine
        height='100vh'
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        projectID='dbb327e5-ae57-4d43-9e39-32feae8e0bf9'
        renderChatFeed = {(chatAppProps) => <ChatFeed { ... chatAppProps } /> }

       />
       </div>
    );
}

export default App; 