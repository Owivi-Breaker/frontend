<template>
    <div id="DrawingBoard" style="text-align:center ">
        <canvas id="canvasPlayground"></canvas>
    </div>
</template>
<script lang="ts" setup>
import {onMounted} from "vue";

onMounted(() => {
    const canvasElement = <HTMLCanvasElement>document.querySelector('#canvasPlayground')
    if (canvasElement === null) {
        return;
    }
    const context = canvasElement.getContext('2d')
    if (context === null) {
        return;
    }
    var captioinText = "";
    context.beginPath()
    var _height = 300;//height of the canvas
    var _width = 600; //width of the canvas
    var x1 = 0, y1 = 0, x2, y2 = 0;

    var canvas = {
        width: _width,
        height: _height,
        halfWidth: _width / 2,
        lineWith: 2,
        backgorund: {Default: "#08a107", Orange: "#f60", Green: "#456f45"},
        borerColor: {White: "#fff", Green: "#f80"},
        colorMap: {Orange: "#f60", Green: "#f80"}
    };
    var common = {
        fillColor: {Default: "#0d5f0c", Green: "green", Red: "red", Orange: "#f60", White: "#fff"},
        borderColor: "#fff",
        fontFamily: " 'Segoe UI',Arial,sans-serif",
        font: {Default: "12px 'Segoe UI',Arial,sans-serif", Heading: "14px 'Segoe UI',Arial,sans-serif"},
        lineWidth: {Pixel1: 1, Pixel2: 2, Pixel3: 3, Pixel4: 4, Pixel5: 5},
        arrowLength: {Default: 70, Pixel50: 50}
    };

    var penaltyArea = {
        height: Math.ceil((canvas.height * 70) / 100),
        width: Math.ceil((canvas.width * 12) / 100),
        yPosition: Math.ceil(((canvas.height * 30) / 100) / 2),
        xPosition: {TeamA: 0, TeamB: canvas.width - Math.ceil((canvas.width * 12) / 100)}
    };
    var goalArea = {
        height: Math.ceil((penaltyArea.height * 60) / 100),
        width: Math.ceil(penaltyArea.width / 2),
        yPositon: (canvas.height - penaltyArea.height),
        xPosition: {TeamA: 0, TeamB: Math.ceil(canvas.width - (penaltyArea.width / 2))}
    };
    var penaltyArc = {
        xPosition: {
            TeamA: penaltyArea.width - goalArea.width / 4,
            TeamB: canvas.width - penaltyArea.width + goalArea.width / 4
        },
        yPosition: canvas.height / 2,
        radius: goalArea.height / 3
    };

    var groundCorner = {
        radius: Math.ceil((canvas.height * 2) / 100)
    };

    function playground() {

    }

    playground.prototype.setGroundStyles = function () {
        canvasElement.setAttribute("width", String(canvas.width));
        canvasElement.setAttribute("height", String(canvas.height));
        canvasElement.style.border = "2px solid " + canvas.borerColor.White;
        canvasElement.style.margin = "auto 25px";
        canvasElement.style.background = canvas.backgorund.Default;
    }
    playground.prototype.drawCenterSpot = function (xAxis: any, yAxis: any, radius: any) {
        context.beginPath();
        context.arc(xAxis, yAxis, radius, 0, 2 * Math.PI);
        context.fillStyle = common.fillColor.Default;
        context.fill();
        context.lineWidth = common.lineWidth.Pixel2;
        context.strokeStyle = common.borderColor;
        context.stroke();
    }

    playground.prototype.drawCorner = function (xAxis: any, yAxis: any) {
        context.beginPath();
        context.arc(xAxis, yAxis, groundCorner.radius, 0, 2 * Math.PI);
        context.fillStyle = common.fillColor.Default;
        context.fill();
        context.lineWidth = common.lineWidth.Pixel2;
        context.strokeStyle = common.borderColor;
        context.stroke();

    }
    //Rectangular Area
    playground.prototype.drawPenaltyArea = function (xAxis: any, yAxis: any) {
        context.beginPath();
        context.fillStyle = common.fillColor.Default;
        context.fill();
        context.fillRect(xAxis, yAxis, penaltyArea.width, penaltyArea.height);
        context.lineWidth = common.lineWidth.Pixel2;
        context.strokeStyle = common.borderColor;
        context.strokeRect(xAxis, yAxis, penaltyArea.width, penaltyArea.height);
    }
    playground.prototype.drawGoalArea = function (xAxis: any, yAxis: any) {
        context.beginPath();
        context.fillStyle = common.fillColor.Default;
        context.fill();
        context.fillRect(xAxis, yAxis, goalArea.width, goalArea.height);
        context.lineWidth = common.lineWidth.Pixel1;
        context.strokeStyle = common.borderColor;
        context.strokeRect(xAxis, yAxis, goalArea.width, goalArea.height);
    }
    playground.prototype.drawPenaltyArc = function (xAxis: any, yAxis: any, radius: any) {
        context.beginPath();
        context.arc(xAxis, yAxis, radius, 0, 2 * Math.PI);
        context.fillStyle = common.fillColor.Default;
        context.fill();
        context.lineWidth = common.lineWidth.Pixel2;
        context.strokeStyle = common.borderColor;
        context.stroke();

    }
    playground.prototype.drawPenaltySpot = function (xAxis: any, yAxis: any, radius: any) {
        context.beginPath();
        context.arc(xAxis, yAxis, radius, 0, 2 * Math.PI);
        context.fillStyle = common.fillColor.Default;
        context.fill();
        context.lineWidth = common.lineWidth.Pixel3;
        context.strokeStyle = common.borderColor;
        context.stroke();
    }

    playground.prototype.writeText = function (text: any, xAxis: any, yAxis: any, font: any, color: any) {
        font = (typeof font == 'undefined') ? common.font.Default : font;
        color = (arguments.length >= 5) ? color : common.fillColor.White;
        context.font = font;
        context.fillStyle = color;
        context.fillText(text, xAxis, yAxis);

    }
    playground.prototype.drawLine = function (x1: any, y1: any, x2: any, y2: any) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.lineWidth = Number(common.lineWidth);
        context.fillStyle = common.fillColor.White;
        context.fill();
    }
    playground.prototype.drawArrowLine = function (x1: any, y1: any, x2: any, y2: any, isReverseArrow: any) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = common.fillColor.Orange;
        context.lineWidth = common.lineWidth.Pixel1;
        context.stroke();

        var x2ofLine = x2;
        var y2OfLine = y2;

        if (!isReverseArrow) {
            for (var i = 0; i <= 2; i++) {
                x1 = x2ofLine;
                y1 = ((i == 0) || (i == 2)) ? (y2OfLine - 4) : (y2OfLine + 4);
                x2 = (i == 2) ? (x2ofLine) : (x2ofLine + 4);
                y2 = (i == 2) ? (y2OfLine + 4) : y2OfLine;

                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineWidth = common.lineWidth.Pixel2;
                context.strokeStyle = common.fillColor.Orange
                context.stroke();
            }
        } else {
            for (var i = 0; i <= 2; i++) {
                x1 = x2ofLine;
                y1 = ((i == 0) || (i == 2)) ? (y2OfLine + 4) : (y2OfLine - 4);
                x2 = (i == 2) ? (x2ofLine) : (x2ofLine - 4);
                y2 = (i == 2) ? (y2OfLine - 4) : y2OfLine;

                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineWidth = 2;
                context.strokeStyle = common.fillColor.Orange;
                context.stroke();
            }
        }

    }

    playground.prototype.drawCaptionForTeamA = function (ground: { drawArrowLine: (arg0: number, arg1: number, arg2: number, arg3: number, arg4: boolean) => void; writeText: (arg0: any, arg1: number, arg2: number, arg3: string) => void; }) {
        //Caption for Penalty Area
        x1 = penaltyArea.width - 20;
        y1 = canvas.height - penaltyArea.height;
        x2 = x1 + common.arrowLength.Default;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, false);
        captioinText = "Penalty Area";
        ground.writeText(captioinText, x2, y2 - 10, common.font.Heading);

        //Caption for Goal Area
        x1 = goalArea.width - goalArea.width / 2;
        y1 = canvas.height - goalArea.height + 60;
        x2 = x1 + common.arrowLength.Pixel50;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, false);
        captioinText = "Goal Area";
        ground.writeText(captioinText, x2, y2 - 10, common.font.Heading);

        //Caption for Penalty Arc
        x1 = penaltyArea.width + 20;
        y1 = canvas.height / 2;
        x2 = x1 + common.arrowLength.Default;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, false);
        captioinText = "Penalty Arc";
        ground.writeText(captioinText, x2, y2 - 10, common.font.Heading);

        //Caption for Penalty Spot
        x1 = goalArea.width / 2;
        y1 = canvas.height / 2;
        x2 = x1 + common.arrowLength.Pixel50;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, false);
        captioinText = "Penalty Spot";
        ground.writeText(captioinText, x2, y2 - 10, common.font.Heading);
    }


    playground.prototype.drawCaptionForTeamB = function (ground: { drawArrowLine: (arg0: number, arg1: number, arg2: number, arg3: number, arg4: boolean) => void; writeText: (arg0: any, arg1: number, arg2: number, arg3: string) => void; }) {

        //Caption for Penalty Area
        x1 = canvas.width - penaltyArea.width + 20;
        y1 = canvas.height - penaltyArea.height;
        x2 = x1 - common.arrowLength.Default;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, true);
        captioinText = "Penalty Area";
        ground.writeText(captioinText, x2 - 50, y2 - 10, common.font.Heading);

        //Caption for Goal Area
        x1 = canvas.width - goalArea.width / 2;
        y1 = canvas.height - goalArea.height + 60;
        x2 = x1 - common.arrowLength.Pixel50;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, true);
        captioinText = "Goal Area";
        ground.writeText(captioinText, x2 - 50, y2 - 10, common.font.Heading);

        //Caption for Penalty Arc
        x1 = canvas.width - penaltyArea.width - 20;
        y1 = canvas.height / 2;
        x2 = x1 - common.arrowLength.Default;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, true);
        captioinText = "Penalty Arc";
        ground.writeText(captioinText, x2 - 50, y2 - 10, common.font.Heading);

        //Caption for Penalty Spot
        x1 = goalArea.width / 2;
        y1 = canvas.height / 2;
        x2 = x1 + common.arrowLength.Pixel50;
        y2 = y1;
        ground.drawArrowLine(x1, y1, x2, y2, true);
        captioinText = "Penalty Spot";
        ground.writeText(captioinText, x2, y2 - 10, common.font.Heading);
    }
    var xPos = 0;
    var yPos = 0;
    var ground = new (playground as any)();
    ground.setGroundStyles();
    setTimeout(function () {
        //First draw all corners
        ground.drawCorner(5, 5);//Left Top
        ground.drawCorner(5, canvas.height - 5); //Bottom Left
        ground.drawCorner(canvas.width - 5, 5); //Top Right
        ground.drawCorner(canvas.width - 5, canvas.height - 5); //Bottom Right

        //Now draw ground devider after 500 ms
        setTimeout(function () {
            //Half-way line
            ground.drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);
            captioinText = "Half-Way Line";
            xPos = (canvas.width / 2) + common.arrowLength.Default;
            yPos = canvas.height / 6;

            //Now draw center spot
            setTimeout(function () {
                ground.drawArrowLine(canvas.halfWidth, yPos, xPos, yPos);
                ground.writeText(captioinText, xPos + 10, yPos, common.font.Heading);
                ground.drawCenterSpot(canvas.width / 2, canvas.height / 2, penaltyArc.radius);
                ground.drawPenaltySpot(canvas.width / 2, canvas.height / 2, 2);

                //Draw Team a Penaly Areas
                setTimeout(function () {
                    //Team-A
                    captioinText = "Team - A";
                    xPos = Math.ceil((canvas.width) / 4) - Math.ceil(captioinText.length / 2);
                    yPos = 20;
                    ground.writeText(captioinText, xPos, yPos, common.font.Heading, "Yellow");
                    ground.drawPenaltyArc(penaltyArc.xPosition.TeamA, penaltyArc.yPosition, penaltyArc.radius);
                    ground.drawPenaltyArea(penaltyArea.xPosition.TeamA, penaltyArea.yPosition);
                    ground.drawGoalArea(goalArea.xPosition.TeamA, goalArea.yPositon);
                    ground.drawPenaltySpot(goalArea.width / 2, canvas.height / 2, 2);
                    ground.drawCaptionForTeamA(ground);

                    ////Draw Team a Penaly Areas
                    setTimeout(function () {
                        //Team*B
                        captioinText = "Team - B";
                        xPos = canvas.width - canvas.width / 3.5;
                        ground.writeText(captioinText, xPos, yPos, common.font.Heading, "Yellow");
                        ground.drawPenaltyArc(penaltyArc.xPosition.TeamB, penaltyArc.yPosition, penaltyArc.radius);
                        ground.drawPenaltyArea(penaltyArea.xPosition.TeamB, penaltyArea.yPosition);
                        ground.drawGoalArea(goalArea.xPosition.TeamB, goalArea.yPositon);
                        ground.drawPenaltySpot(canvas.width - (goalArea.width / 2), canvas.height / 2, 2);
                        ground.drawCaptionForTeamB(ground);

                        setTimeout(function () {
                            //Draw Captions for Center Spot
                            ground.drawArrowLine(canvas.halfWidth, canvas.height / 2, canvas.halfWidth + penaltyArc.radius * 2, canvas.height / 2, false);
                            captioinText = "Center Spot";
                            xPos = canvas.halfWidth + penaltyArc.radius * 2;
                            yPos = (canvas.height / 2) - 10;
                            ground.writeText(captioinText, xPos, yPos, common.font.Heading, "yellow");
                        }, 500);

                    }, 500);

                }, 500);

            }, 500);

        }, 500);

    }, 500);

})
</script>
