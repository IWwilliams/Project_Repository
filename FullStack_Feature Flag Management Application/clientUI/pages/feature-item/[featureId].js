import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect, useReducer } from "react";
import FeatureFlagComponent from "../../components/FeatureFlag/FeatureFlag";
import FeatureFlag from "../../../shared/model/featureFlag";
import api from "../api/axios";
import LoadingModal from "../../components/FeatureFlag/LoadingModal";
import Modal from "../../components/UI/Modal";

const flagPageManager = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "DATA_GATHERED":
      console.log("entered data gathered");
      {
        return {
          ...state,
          toggleState: action.response.data.value,
          feature: new FeatureFlag(
            action.response.data[0].key,
            action.response.data[0].name,
            action.response.data[0].value,
            action.response.data[0].lastUpdatedDate,
            action.response.data[0].description
          ),
          loading: false,
        };
      }
    case "TOGGLE_CHANGED": {
      console.log("Entered Toggle Changed");
      return {
        ...state,
        toggleState: !state.toggleState,
      };
    }
    case "MODAL_SELECTION":
      {
        if (action.selection == "SAVED") {
          return {
            ...state,
            modalType: (
              <Modal
                title="Changes Saved"
                message="Feature flag status successfully updated!"
                onCancel={state.fncloseModal}
                onConfirm={state.fnreturnToHome}
              />
            ),
          };
        } else if (action.selection == "UNSAVED") {
          return {
            ...state,
            modalType: (
              <Modal
                title="Are You Sure?"
                message="You have not saved your changes and will lose them if you return home."
                onCancel={state.fncloseModal}
                onConfirm={state.fnreturnToHome}
              />
            ),
          };
        }
      }
      break;
  }
  return { ...state, modalType: null };
};

export default function FeaturePage() {
  const router = useRouter();
  const closeModal = () => {
    dispatchPageHandler({
      type: "MODAL_SELECTION",
    });
  };
  const returnToHome = () => {
    dispatchPageHandler({
      type: "MODAL_SELECTION",
    });
    router.push("/");
  };
  const [flagPage, dispatchPageHandler] = useReducer(flagPageManager, {
    loading: true,
    feature: {},
    toggleState: null,
    modalType: null,
    fncloseModal: closeModal,
    fnreturnToHome: returnToHome,
  });

  const fetchFeatureFlag = async () => {
    try {
      //Update path and data handling once feature flag specific api is set up
      const response = await api.get(`/featureflag/${router.query.featureId}`);
      console.log(response);
      dispatchPageHandler({
        type: "DATA_GATHERED",
        response: response,
      });
    } catch (err) {
      if (err.response) {
        // Not in 200 response range
        console.log(err.response.data);
      } else {
        //No response at all (404, etc)
        console.log(`Error ${err.message}`);
      }
    }
  };

  useEffect(() => {
    fetchFeatureFlag();
    console.log("Effect ran on start");
  }, []);

  const toggleStateHandler = () => {
    dispatchPageHandler({
      type: "TOGGLE_CHANGED",
    });
  };

  const onSave = async () => {
    //Post object new object to server
    try {
      console.log(flagPage.feature.key, flagPage.toggleState);
      const response = await api.post("/changeflag", {
        key: flagPage.feature.key,
        value: flagPage.toggleState,
      });

      //If Successful post
      console.log(response);
      if (response.status===200) {
        dispatchPageHandler({
          type: "MODAL_SELECTION",
          selection: "SAVED",
        });
        fetchFeatureFlag();
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const onReturn = () => {
    console.log(flagPage.toggleState, flagPage.feature.value);
    if (flagPage.toggleState !== flagPage.feature.value) {
      dispatchPageHandler({
        type: "MODAL_SELECTION",
        selection: "UNSAVED",
      });
      return;
    }
    router.push("/");
  };

  return (
    <div>
      {flagPage.modalType}
      {flagPage.loading ? (
        <LoadingModal />
      ) : (
        <FeatureFlagComponent
          name={flagPage.feature.name}
          value={flagPage.feature.value}
          toggleStateHandler={toggleStateHandler}
          onSave={onSave}
          onReturn={onReturn}
        />
      )}
    </div>
  );
}
