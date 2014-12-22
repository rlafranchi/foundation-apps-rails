require 'pry'
class PostsController < ApplicationController
  respond_to :json
  def index
    respond_with Post.all
  end

  def show
    respond_with Post.find(params[:id])
  end

  def create
    respond_with Post.create(post_params)
  end

  def update
    post = Post.find(params[:id])
    respond_to do |format|
      if post.update_attributes(post_params)
        format.json { render json: post }
      else
        format.json { render json: {"errors"=> post.errors}, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
