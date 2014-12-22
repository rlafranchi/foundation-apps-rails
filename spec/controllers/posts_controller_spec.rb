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
end
