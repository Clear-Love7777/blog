<template>
    <div class="vue-calendar" style="height: 800px">
        <div style="font-size: 20px;text-align: center;margin-bottom: 10px">
            <div style="padding: 10px;display: flex;align-items: center;justify-content: space-between">
                <p>
                    <i class="icon-arrow-left-year calendar-icon" @click="lastYear"><<</i>
                    <i class="icon-arrow-left calendar-icon" @click="lastMonth"><</i>
                </p>
                <p>
                    <span>{{ year }} 年 </span>
                    <span> {{ month + 1 }} 月</span>
                </p>
                <p>
                    <i class="icon-arrow-right calendar-icon" @click="nextMonth">></i>
                    <i class="icon-arrow-right-year calendar-icon" @click="nextYear">>></i>
                </p>

            </div>
        </div>
        <table id="table">
            <thead>
            <tr>
                <th v-for="item in weekArray" :key="item">{{ item }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in dateArr" :key="index">
                <td v-for="(val, num) in item" :key="num" @click="dateClick(val, $event)"
                    :class="tdClass(val)">
                    <span :class="spanClass(val, index)">{{ val.day }}</span>

                    <div class="schedule" v-for="(textItem, index) in infoArr"
                         :key="index"
                         v-if="textItem.year === val.year && (textItem.day === val.day && textItem.month === val.month)">
                        <span v-show="textItem.count">（{{ textItem.count }} 条）</span>
                        <div class="schedule-content">
                            <p v-for="(value, num) in textItem.taskCalendarList" :key="num">
                                {{ value }}
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: null,
                dateArr: [],
                weekArray: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
                day: new Date().getDate(),
                currentYear: new Date().getFullYear(),
                infoArr: [
                    {
                        year: 2020,
                        month: new Date().getMonth() + 1,
                        day: 14,
                        count: 5,
                        taskCalendarList: ['07:00 嗷嗷嗷', '08:00 酷酷酷', '13:35 水水水水水', '18:20 斤斤计较', '20:00 噢噢噢噢']
                    }
                ]
            }
        },
        mounted() {
            this.dateFun()
        },
        methods: {
            /**        日期计算逻辑    **/
            dateFun() {
                this.dateArr = [];
                let arr = [];
                let count = 0;
                let date = new Date(this.year, this.month);
                date.setMonth(this.month + 1); // 给new date设置今天的月份+1个月（下个月）
                date.setDate(0); // 设置上个月最后一天，也就是当前的月份最后一天

                let num = date.getDate(); // 获取当前月份最后一天

                // 按当前月份共有多少天循环创建数组
                for (let i = 0; i < num; i++) {
                    date.setDate(i + 1); // 循环设置new date为i+1号

                    // 每7条数据生成一个数组
                    if (count < 6 && i !== date.getDate()) {
                        count = date.getDay() === 0 ? 6 : date.getDay() - 1; // 一周中的某一天控制数组的下标，因为每个月的1号的周数不一样
                        arr[count] = {day: i + 1, week: date.getDay(), month: this.month + 1, year: this.year}
                    }

                    if (arr.length === 7 || i === num - 1) {
                        this.dateArr.push(arr); // 生成二维数组
                        count = 0; // 置0，从新开始
                        arr = []
                    }
                }

                /**         计算上个月日期    **/
                let lastMargin = null;
                let lastArr = this.dateArr[0];
                date.setDate(0);

                // 计算第一列数组还需要循环几次填充满
                for (let item of lastArr) {
                    if (item) {
                        lastMargin = item.week === 0 ? 6 : item.week - 1; // 计算还差几条数据
                        break
                    }
                }

                let day = date.getDate();
                // 循环填充满第一列数组
                for (let i = lastMargin; i > 0; i--) {
                    date.setDate(day--);
                    lastArr[date.getDay() - 1] = {
                        day: date.getDate(),
                        week: date.getDay(),
                        month: this.month,
                        year: this.month === 0 ? this.year - 1 : this.year
                    }
                }

                /**         计算下个月日期      **/
                let nextDate = new Date(this.year, this.month + 1);
                let nextMargin = null;
                let dateArr = this.dateArr[this.dateArr.length - 1];
                let nextMonthArr = []; // 用于新增一行数组

                // 计算最后一列数组还需要循环几次填充满
                for (let i = 0; i < 7; i++) {
                    if (typeof dateArr[i] === 'undefined') {
                        nextMargin = 7 - dateArr[i - 1].week; // 计算还差几条数据
                        break
                    }
                }
                if (nextMargin > 0) {
                    // 循环填充满最后一列数组
                    for (let i = 0; i < nextMargin; i++) {
                        nextDate.setDate(i + 1);
                        dateArr[nextDate.getDay() === 0 ? 6 : nextDate.getDay() - 1] = {
                            day: nextDate.getDate(),
                            week: nextDate.getDay(),
                            month: this.month + 2,
                            year: this.month + 2 === 12 ? this.year + 1 : this.year
                        }
                    }
                }

                // dateArr长度不为6补足到长度为6
                if (this.dateArr.length < 6) {
                    let num = 7;
                    let arr = [];
                    for (let j = 0; j < 6 - this.dateArr.length; j++) {
                        arr = [];
                        num *= (j + 1);
                        for (let i = num - 7; i < num; i++) {
                            nextDate.setDate(nextMargin + (i + 1));
                            arr.push({
                                day: nextMargin + (i + 1),
                                week: nextDate.getDay(),
                                month: this.month + 2,
                                year: this.month + 2 === 12 ? this.year + 1 : this.year
                            })
                        }
                        nextMonthArr[j] = arr
                    }
                }
                if (nextMonthArr.length > 0) {
                    for (let item of nextMonthArr) {
                        this.dateArr.push(item)
                    }
                }
            },

            /**        td > span 不为当前月份的日期置灰    **/
            spanClass(val) {
                if (val.month !== this.month + 1) {
                    return 'other-months'
                }
            },

            /**        判断选中的日期改变class    **/
            tdClass(val) {
                if (val.month === (this.month + 1)) {
                    if ((this.activeIndex === val.day) || (val.day === this.day && this.currentYear === val.year)) {
                        if (this.activeIndex) {
                            this.day = this.activeIndex;
                        }
                        return 'td-active'
                    } else {
                        return 'td-default'
                    }
                } else {
                    return 'td-default'
                }
            },

            /**        日期点击事件    **/
            dateClick(val, e) {
                this.activeIndex = val.day;
                if (e.target.className === 'other-months' || (e.target.children[0] && e.target.children[0].className === 'other-months')) {
                    if (val.month > this.month) {
                        this.nextMonth()
                    } else {
                        this.lastMonth()
                    }
                }
            },

            /**        上个月    **/
            lastMonth() {
                this.month--;
                if (this.month === -1) {
                    this.month = 11;
                    this.year--;
                }
                this.$nextTick(() => {
                    this.dateFun()
                })
            },

            /**        下个月    **/
            // nextMonth() {
            //     this.month++;
            //     if (this.month === 12) {
            //         this.month = 0;
            //         this.year++
            //     }
            //     this.$nextTick(() => {
            //         this.dateFun()
            //     })
            // },

            /**        下一年    **/
            nextYear() {
                this.year += 1;
                this.$nextTick(() => {
                    this.dateFun()
                })
            },

            /**        上一年    **/
            lastYear() {
                this.year -= 1;
                this.$nextTick(() => {
                    this.dateFun()
                })
            }
        }
    }
</script>

<style lang="less">
    .vue-calendar {
        .calendar-icon {
            cursor: pointer;
        }

        .icon-arrow-right-year {
            margin-left: 20px;
        }

        .icon-arrow-left-year {
            margin-right: 20px;
        }

        #table {
            height: 100%;
            width: 100%;
            border-collapse: collapse;

            thead {
                text-align: center;

                tr {
                    border: 1px #e2e2e2 solid;
                    height: 50px;
                }
            }

            tbody {
                text-align: center;

                .td-active {
                    background: #fb0;
                    color: #ffffff;
                }

                .td-default:hover {
                    background: #e2e2e2;
                }

                td {
                    cursor: pointer;
                    width: 210px;
                    border: 1px #e2e2e2 solid;
                    padding: 0;
                    font-size: 20px;
                    position: relative;

                    & > span {
                        position: absolute;
                        top: 0;
                        left: 10px;
                    }

                    .other-months {
                        color: #c0c4cc;
                    }

                    .schedule {
                        height: 75%;
                        position: absolute;
                        width: 100%;
                        bottom: 0;

                        span {
                            font-size: 20px;
                            position: absolute;
                            left: 30px;
                            top: -32px;
                        }

                        .schedule-content {
                            position: relative;
                            /*left: 23px;*/
                            width: 100%;
                            height: 100%;
                            overflow: auto;

                            p {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                margin-bottom: 10px;
                                font-size: 13px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>