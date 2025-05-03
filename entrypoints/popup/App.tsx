import { Button } from "../components/button";

function App() {
  const onClickOpenOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <>
      <p className="bg-red-500">hello world!</p>
      <Button
        color="primary"
        size="md"
        text="open settings"
        onClick={onClickOpenOptionsPage}
      />
      <div className="bg-primary-dark">aaaa</div>
    </>
  );
}

export default App;
