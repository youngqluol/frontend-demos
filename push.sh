#!/bin/bash

diff="git diff"
add="git add ."
commit="git commit -m "

echo "请输入commit信息："
read commitMsg
commit2=$((commit+commitMsg))

echo ${commit2}

read test