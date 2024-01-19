import { Content, Header, Divider } from "rsuite";

const QueueTask = ({}) => {
    return (
        <>
            <Header>
                <h2
                    style={{
                        color: "white",
                        marginTop: "20px",
                        marginLeft: 30,
                    }}
                >
                    Завдання до виконання 
                </h2>
            </Header>
            <Content style={{ color: "white", marginLeft: 10 }}>
                <Divider />
                <div>
                    
                </div>
            </Content>
        </>
    );
};

export default QueueTask;
