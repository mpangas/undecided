package models

type Tutorial struct {
	Id       int    `json:"id"` // don't pass this in
	Title    string `json:"title"`
	Location string `json:"location"`
	User     string `json:"user"`
	PostTime int64  `json:"postTime"` // don't pass this in
	EditTime int64  `json:"editTime"`
	Score    int    `json:"score"` // don't pass this in
}
