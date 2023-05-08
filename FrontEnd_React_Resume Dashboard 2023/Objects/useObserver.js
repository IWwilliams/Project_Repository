const useObserver = () => {
  const createObserver = (props) => {
    if (props) {
      let observer = new IntersectionObserver(
        props.reactionFunction,
        {
          threshold: props.threshold,
        },
        { root: null }
      );
      return observer;
    }
  };

  return [createObserver];
};

export default useObserver;
