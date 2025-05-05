import { Button } from "#/components/ui/button";

function App() {
  const onClickOpenOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <>
      <p className="bg-red-500">hello world!</p>
      <Button color="primary" onClick={onClickOpenOptionsPage}>
        open settings
      </Button>
      <div className="bg-primary-dark">aaaa</div>
    </>
  );
}

export default App;
