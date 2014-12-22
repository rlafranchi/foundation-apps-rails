require 'spec_helper'

describe PostsController do
  describe "GET #index" do
    it "responds to request" do
      get :index, format: :json
      expect(response).to be_success
      expect(response.body).to be_present
    end
    it "returns array of posts" do
      post1 = Fabricate(:post)
      post2 = Fabricate(:post)
      get :index, format: :json
      expect(response.body).to eq(Post.all.to_json)
    end
  end
  describe "GET #show" do
    let(:post) { Fabricate(:post) }
    before { get :show, id: post.id, format: :json }
    it "responds to request" do
      expect(response).to be_success
      expect(response.body).to be_present
    end
    it "returns the post" do
      expect(response.body).to eq(post.to_json)
    end
  end
  describe "POST #create" do
    context "valid input" do
      before { post :create, format: :json, post: {title: "Title", content: "some content"} }
      it "responds to request successfully" do
        expect(response).to be_success
        expect(response.body).to be_present
      end
      it "creates the post" do
        expect(Post.count).to eq(1)
      end
      it "responds with the post" do
        expect(response.body).to eq(Post.first.to_json)
      end
    end
    context "invalid input" do
      before { post :create, format: :json, post: {title: "", content: "some content"} }
      it "responds to request unsuccessfully" do
        expect(response).to_not be_success
        expect(response.body).to be_present
      end
      it "does not create the post" do
        expect(Post.count).to eq(0)
      end
      it "responds with an error message" do
        expect(JSON.parse(response.body)["errors"]).to be_present
      end
    end
  end
  describe "PUT #update" do
    context "valid input" do
      let(:post) { Fabricate(:post) }
      before { put :update, format: :json, id: post.id, post: {title: "Title", content: "some other content"} }
      it "responds to request successfully" do
        expect(response).to be_success
        expect(response.body).to be_present
      end
      it "updates the post" do
        expect(post.reload.content).to eq("some other content")
      end
      it "responds with the post" do
        expect(response.body).to eq(post.reload.to_json)
      end
    end
    context "invalid input" do
      let(:post) { Fabricate(:post) }
      before { put :update, format: :json, id: post.id, post: {title: "", content: "some content"} }
      it "responds to request unsuccessfully" do
        expect(response).to_not be_success
        expect(response.body).to be_present
      end
      it "does not update post" do
        expect(post.reload.title).to eq("Title")
      end
      it "responds with an error message" do
        expect(JSON.parse(response.body)["errors"]).to be_present
      end
    end
  end
  describe "DELETE #destroy" do
    let(:post) { Fabricate(:post) }
    before { delete :destroy, format: :json, id: post.id }
    it "deletes the post" do
      expect(Post.count).to eq(0)
    end
    it "responds with 204 status" do
      expect(response.status).to eq(204)
    end
  end
end
