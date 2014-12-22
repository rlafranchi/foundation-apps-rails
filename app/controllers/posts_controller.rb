class PostsController < ApplicationController
  respond_to :json
  def index
    respond_with Post.all
  end
end
