class Post < ActiveRecord::Base
  validates_presence_of :title
  validates_length_of :title, :minimum => 3
end
