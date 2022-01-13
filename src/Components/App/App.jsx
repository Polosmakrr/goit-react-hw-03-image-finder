import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loader from "react-loader-spinner";
import fetchPick from "../Fetch/fetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export class App extends Component {
  state = {
    arrayList: [],
    queryName: "",
    page: 1,
    loading: false,
    showModal: false,
    largeImg: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.queryName !== this.state.queryName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
     
      fetchPick(this.state.queryName,this.state.page)
        .then((newArray) => {
          if (newArray.total === 0) {
            toast.warn(`Ничего не найдено`);
          } else {
            this.setState((prevState) => ({
              arrayList: [...prevState.arrayList, ...newArray.hits],
            }));
          }
        })
        .catch((error) => toast.error("Oops, something went wrong"))
        .finally(() => this.setState({ loading: false }));
    }
    if (prevState.arrayList !== this.state.arrayList && this.state.page !== 1) {
      window.scrollTo({ top: document.body.clientHeight, behavior: "smooth" });
    }
  }

  getLargeImageForModal = (data) => {
    this.toggleModal();
    this.setState({ largeImg: data });
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  handleFormSubmit = (data) => {
    this.setState({ queryName: data, arrayList: [], page: 1 });
  };

  handleClikLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading && (
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        )}
        {this.state.arrayList.length !== 0 && (
          <ImageGallery
            modalImageLoad={this.getLargeImageForModal}
            arrayQueryList={this.state.arrayList}
            onToggleMenu={this.toggleModal}
          />
        )}

        {this.state.arrayList.length !== 0 && (
          <Button onClick={this.handleClikLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            onToggleMenu={this.toggleModal}
            modalImage={this.state.largeImg}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
