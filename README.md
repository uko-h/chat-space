# README

# README

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|Integer|null: false, foreign_key: true|
|text|Text|null: false, foreign_key: true|
|image|Image_url|foreign_key: true|
|user_id|Integer|null: false, foreign_key: true|
|created_at|Datetime|null: false, foreign_key: true|

### Association
- bilongs_to :user
- bilongs_to :group

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|Integer|null: false, foreign_key: true|
|mame|String|null: false, foreign_key: true, unique: true|
|email|String|null: false, unique: true|
|password|String|null: false|
|created_at|Datetime|null: false, foreign_key: true|
|updated_at|Datetime|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|Integer|null: false, foreign_key: true|
|name|String|null: false, foreign_key: true, unique: true|
|user_id|Integer|null: false, foreign_key: true|
|user_name|String|null: false, foreign_key: true, unique: true|
|created_at|Datetime|null: false, foreign_key: true|
|updated_at|Datetime|null: false, foreign_key: true|

### Association
- has_many :users
- has_many :groups_users
- has_many :users, through: :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|Integer|null: false, foreign_key: true|
|group_id|Integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
