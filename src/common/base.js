export default{
    methods: {
            getData() {
              var _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/bi/groupon/rank',
                    body: _this.param,
                    header: 'Accept application/json'
                }).then(response => {
                    if(response.data.code == 0){
                        _this.spinShow = false;
                        _this.list = response.body.data.data;
                    }
                    
                          });
            },
            dateChange(e){
                var time = e.split(' - ');
                this.start = time[0];
                this.end = time[1];
                this.param.time = [this.start, this.end];
                this.time = this.param.time;
            },
            select(){ //确认筛选
                if(this.start == 0 || this.end == 0){
                    this.$Message.warning('请先选择日期范围');
                    return;
                }
                
                this.getData();
            
            },
             pageChange(e){//下一页
                var _this = this;
                _this.param.page=e;
                _this.getData();
             
            },
            sortChange(e){
                this.param.order = {};
                if(e.order !== 'normal'){
                    this.param.page = 1;
                    this.param.order = [e.key, e.order];
                }else{
                   delete this.param.order;
                }
                this.getData();
            }
    }
};