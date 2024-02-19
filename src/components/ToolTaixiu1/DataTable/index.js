import React, { useEffect, useState } from "react";

import { UTCtoLocalTime, UTCtoLocalTimeTool1, formatNumber } from "../../../helpers";
import { funcTimeRun } from "../../ToolTaixiu3/Functions/DateSelector";

const DataTable = (props) => {
    const {
        e,
        odds,
        matchedHandicapItem,
        matchedOverItem,
        matchedScheduleEmitItem,
        selectedTeamUp,
        selectedHandicap,
        selectedOddHandicap,
        selectedOver,
        selectedOddOver
    } = props;
    const [tipHandicap, setTipHandicap] = useState("");
    const [tipHandicapName, setTipHandicapName] = useState("");
    const [tipOU, setTipOU] = useState("");
    const [tipOUName, setTipOUName] = useState("");

    // const scheduleRT = statusRedux?.$;
    const isLocalTimeZone = localStorage.getItem('TIME_ZONE')

    const handleViewClickButton = () => {
        let params = '';

        if (tipHandicap !== '') {
            params += `ah=${tipHandicap}`;
        }

        if (tipOU !== '') {
            if (params !== '') {
                params += '&';
            }
            params += `ou=${tipOU}`;
        }

        const newUrl = `/match/${e.MATCH_ID}${params !== '' ? `?${params}` : ''}`;
        window.open(newUrl, '_blank');
    };
    useEffect(() => {
        const runTip = () => {
            var tr = document.getElementById("tr_" + e.MATCH_ID);

            if (tr) {
                var bdCellInsertUpOdd = tr.querySelector("#insertUpOdd_" + e.MATCH_ID);
                var bdCellInsertDownOdd = tr.querySelector("#insertDownOdd_" + e.MATCH_ID);

                var bdCellInsertGoal = tr.querySelector("#insertGoal_" + e.MATCH_ID);
                var bdCellInsertGoalLive = tr.querySelector("#insertGoalLive_" + e.MATCH_ID);

                var bdCellInsertGoal_t1 = tr.querySelector("#insertGoal_t1_" + e.MATCH_ID);

                var bdCellInsertUpodds_t = tr.querySelector("#insertUpodds_t_" + e.MATCH_ID);
                var bdCellInsertDownodds_t = tr.querySelector("#insertDownodds_t_" + e.MATCH_ID);

                var attriCellInsertUpOdd = bdCellInsertUpOdd.getAttribute('data-0');
                var attriCellInsertDownOdd = bdCellInsertDownOdd.getAttribute('data-0');
                var attriCellInsertGoal = bdCellInsertGoal.getAttribute('data-0');
                var attriCellInsertGoalLive = bdCellInsertGoalLive.getAttribute('data-0');
                var attriCellInsertGoal_t1 = bdCellInsertGoal_t1.getAttribute('data-0');
                var attriCellInsertUpodds_t = bdCellInsertUpodds_t.getAttribute('data-0');
                var attriCellInsertDownodds_t = bdCellInsertDownodds_t.getAttribute('data-0');

                var tipAH = tr.attributes["data-tipah"].textContent;
                var tipOU = tr.attributes["data-tipou"].textContent;

                var teamValue = tr.attributes["team"].textContent;
                var checkHome = tr.querySelector(`#home_${e.MATCH_ID}`);
                var checkAway = tr.querySelector(`#away_${e.MATCH_ID}`);

                var CheckAttriHome = checkHome.getAttribute("class");
                var CheckAttriAway = checkAway.getAttribute("class");

                var parseInsertGoalLive = parseFloat(bdCellInsertGoalLive.textContent);
                var parseInsertDownOdd = parseFloat(bdCellInsertDownOdd.textContent);
                var parseInsertGoal_t1 = parseFloat(bdCellInsertGoal_t1.textContent);
                var parseInsertDownodds_t = parseFloat(bdCellInsertDownodds_t.textContent);
                var parseInsertGoal = parseFloat(bdCellInsertGoal.textContent);
                var parseInsertUpOdd = parseFloat(bdCellInsertUpOdd.textContent);
                var parseInsertUpodds_t = parseFloat(bdCellInsertUpodds_t.textContent);

                if (selectedHandicap && selectedOddHandicap && selectedOver && selectedOddOver) {
                    if (CheckAttriAway === "me_color") {
                        if (parseInsertGoalLive >= selectedHandicap) {
                            tr.style.display = 'revert';

                            if (selectedOddHandicap === "giamgia") {
                                if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) < 0 && parseFloat(attriCellInsertGoalLive) < 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertDownodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) > 0 && parseFloat(attriCellInsertGoalLive) > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertDownodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) > 0 && parseFloat(attriCellInsertUpOdd) > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertDownodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) < 0 && parseFloat(attriCellInsertUpOdd) < 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertDownodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertDownOdd <= selectedOddHandicap) {
                                tr.style.display = 'revert';

                                if (parseInsertGoal_t1 >= selectedOver) {
                                    tr.style.display = 'revert';
                                    if (selectedOddOver === "giamgia") {
                                        if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                            tr.style.display = 'revert';
                                        } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }
                                    } else if (parseInsertDownodds_t <= selectedOddOver) {
                                        tr.style.display = 'revert';

                                    } else {
                                        tr.style.display = 'none';
                                    }

                                } else {
                                    tr.style.display = 'none';
                                }

                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else if (CheckAttriHome === "me_color") {
                        if (parseInsertGoal >= selectedHandicap) {
                            tr.style.display = 'revert';
                            if (selectedOddHandicap === "giamgia") {
                                if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) < 0 && parseFloat(attriCellInsertGoalLive) < 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';

                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertUpodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) > 0 && parseFloat(attriCellInsertGoalLive) > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';

                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertUpodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) > 0 && parseFloat(attriCellInsertUpOdd) > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';

                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertUpodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) < 0 && parseFloat(attriCellInsertUpOdd) < 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';

                                        if (selectedOddOver === "giamgia") {
                                            if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                                tr.style.display = 'revert';
                                            } else {
                                                tr.style.display = 'none';
                                            }
                                        } else if (parseInsertUpodds_t <= selectedOddOver) {
                                            tr.style.display = 'revert';

                                        } else {
                                            tr.style.display = 'none';
                                        }

                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertUpOdd <= selectedOddHandicap) {
                                tr.style.display = 'revert';
                                if (parseInsertGoal_t1 >= selectedOver) {
                                    tr.style.display = 'revert';

                                    if (selectedOddOver === "giamgia") {
                                        if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                            tr.style.display = 'revert';
                                        } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                            tr.style.display = 'revert';
                                        } else {
                                            tr.style.display = 'none';
                                        }
                                    } else if (parseInsertUpodds_t <= selectedOddOver) {
                                        tr.style.display = 'revert';

                                    } else {
                                        tr.style.display = 'none';
                                    }

                                } else {
                                    tr.style.display = 'none';
                                }

                            } else {
                                tr.style.display = 'none';
                            }

                        } else {
                            tr.style.display = 'none';
                        }
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedHandicap && selectedOddHandicap && selectedOver) {
                    if (CheckAttriAway === "me_color") {
                        if (parseInsertGoalLive >= selectedHandicap) {
                            tr.style.display = 'revert';
                            if (selectedOddHandicap === "giamgia") {
                                if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) < 0 && parseFloat(attriCellInsertGoalLive) < 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) > 0 && parseFloat(attriCellInsertGoalLive) > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) > 0 && parseFloat(attriCellInsertUpOdd) > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) < 0 && parseFloat(attriCellInsertUpOdd) < 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertDownOdd <= selectedOddHandicap) {
                                tr.style.display = 'revert';
                                if (parseInsertGoal_t1 >= selectedOver) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }

                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else if (CheckAttriHome === "me_color") {
                        if (parseInsertGoal >= selectedHandicap) {
                            tr.style.display = 'revert';
                            if (selectedOddHandicap === "giamgia") {
                                if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) < 0 && parseFloat(attriCellInsertGoalLive) < 0) {
                                    tr.style.display = 'revert';

                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) > 0 && parseFloat(attriCellInsertGoalLive) > 0) {
                                    tr.style.display = 'revert';

                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) > 0 && parseFloat(attriCellInsertUpOdd) > 0) {
                                    tr.style.display = 'revert';

                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) < 0 && parseFloat(attriCellInsertUpOdd) < 0) {
                                    tr.style.display = 'revert';

                                    if (parseInsertGoal_t1 >= selectedOver) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertUpOdd <= selectedOddHandicap) {
                                tr.style.display = 'revert';

                                if (parseInsertGoal_t1 >= selectedOver) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }

                            } else {
                                tr.style.display = 'none';
                            }

                        } else {
                            tr.style.display = 'none';
                        }
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedOver && selectedOddOver && selectedHandicap) {
                    if (CheckAttriAway === "me_color") {
                        if (parseInsertGoal_t1 >= selectedOver) {
                            tr.style.display = 'revert';
                            if (selectedOddOver === "giamgia") {
                                if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoalLive >= selectedHandicap) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoalLive >= selectedHandicap) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertDownodds_t <= selectedOddOver) {
                                tr.style.display = 'revert';

                                if (parseInsertGoalLive >= selectedHandicap) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }

                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else if (CheckAttriHome === "me_color") {
                        if (parseInsertGoal_t1 >= selectedOver) {
                            tr.style.display = 'revert';
                            if (selectedOddOver === "giamgia") {
                                if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal >= selectedHandicap) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                    tr.style.display = 'revert';
                                    if (parseInsertGoal >= selectedHandicap) {
                                        tr.style.display = 'revert';
                                    } else {
                                        tr.style.display = 'none';
                                    }
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertUpodds_t <= selectedOddOver) {
                                tr.style.display = 'revert';

                                if (parseInsertGoal >= selectedHandicap) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }

                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedHandicap && selectedOddHandicap) {
                    if (CheckAttriAway === "me_color") {
                        if (parseInsertGoalLive >= selectedHandicap) {
                            tr.style.display = 'revert';
                            if (selectedOddHandicap === "giamgia") {
                                if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) < 0 && parseFloat(attriCellInsertGoalLive) < 0) {
                                    tr.style.display = 'revert';
                                } else if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) > 0 && parseFloat(attriCellInsertGoalLive) > 0) {
                                    tr.style.display = 'revert';
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) > 0 && parseFloat(attriCellInsertUpOdd) > 0) {
                                    tr.style.display = 'revert';
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) < 0 && parseFloat(attriCellInsertUpOdd) < 0) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertDownOdd <= selectedOddHandicap) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else if (CheckAttriHome === "me_color") {
                        if (parseInsertGoal >= selectedHandicap) {
                            tr.style.display = 'revert';
                            if (selectedOddHandicap === "giamgia") {
                                if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) < 0 && parseFloat(attriCellInsertGoalLive) < 0) {
                                    tr.style.display = 'revert';
                                } else if (checkAway.textContent === tipAH && parseFloat(attriCellInsertDownOdd) > 0 && parseFloat(attriCellInsertGoalLive) > 0) {
                                    tr.style.display = 'revert';
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) > 0 && parseFloat(attriCellInsertUpOdd) > 0) {
                                    tr.style.display = 'revert';
                                } else if (checkHome.textContent === tipAH && parseFloat(attriCellInsertGoal) < 0 && parseFloat(attriCellInsertUpOdd) < 0) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertUpOdd <= selectedOddHandicap) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedOver && selectedOddOver) {
                    if (CheckAttriAway === "me_color") {
                        if (parseInsertGoal_t1 >= selectedOver) {
                            tr.style.display = 'revert';
                            if (selectedOddOver === "giamgia") {
                                if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                    tr.style.display = 'revert';
                                } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertDownodds_t <= selectedOddOver) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else if (CheckAttriHome === "me_color") {
                        if (parseInsertGoal_t1 >= selectedOver) {
                            tr.style.display = 'revert';
                            if (selectedOddOver === "giamgia") {
                                if (tipOU === "Over" && attriCellInsertUpodds_t > 0) {
                                    tr.style.display = 'revert';
                                } else if (tipOU === "Under" && attriCellInsertDownodds_t > 0) {
                                    tr.style.display = 'revert';
                                } else {
                                    tr.style.display = 'none';
                                }
                            } else if (parseInsertUpodds_t <= selectedOddOver) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else {
                            tr.style.display = 'none';
                        }
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedHandicap) {
                    if (CheckAttriAway === "me_color") {
                        if (parseInsertGoalLive >= selectedHandicap) {
                            tr.style.display = 'revert';
                        } else {
                            tr.style.display = 'none';
                        }
                    } else if (CheckAttriHome === "me_color") {
                        if (parseInsertGoal >= selectedHandicap) {
                            tr.style.display = 'revert';
                        } else {
                            tr.style.display = 'none';
                        }
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedOver) {
                    if (CheckAttriAway === "me_color") {
                        if (parseInsertGoal_t1 >= selectedOver) {
                            tr.style.display = 'revert';
                        } else {
                            tr.style.display = 'none';
                        }
                    } else if (CheckAttriHome === "me_color") {
                        if (parseInsertGoal_t1 >= selectedOver) {
                            tr.style.display = 'revert';
                        } else {
                            tr.style.display = 'none';
                        }
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (selectedHandicap === "" || selectedOddHandicap === "" || selectedOver === "" || selectedOddOver === "") {
                    tr.style.display = 'revert';
                }
            }
        }

        runTip();
        const intervalIdOdds = setInterval(runTip, 3000);

        return () => {
            clearInterval(intervalIdOdds);
        };

    }, [selectedTeamUp, selectedHandicap, selectedOddHandicap, selectedOver, selectedOddOver]);

    useEffect(() => {
        const sreachOdd = (elementId, tr) => {
            const element = tr.querySelector(elementId);
            if (element) {
                const textContent = element.textContent;
                if (textContent !== null) {
                    return parseFloat(textContent);
                }
            }
            return 0;
        };

        const insertData = (tr, data) => {
            const { elementId_positive, sumData_positive, elementId_minus, sumData_minus, tip, tipOU, checkTipsDataHome, checkTipsDataAway, checkTipsDataOU, awayID, homeID, oddHome, oddAway, oddOU } = data;
            const insertElement_positive = tr.querySelector(elementId_positive);
            const insertElement_minus = tr.querySelector(elementId_minus);
            const insertTips = tr.querySelector(tip);
            const insertTipsOU = tr.querySelector(tipOU);
            const home = tr.querySelector(homeID);
            const away = tr.querySelector(awayID);

            if (insertElement_positive) {
                let iconColor = 'transparent';
                let icon = '';
                let absSumData = '0';
                if (sumData_positive > 0) {
                    iconColor = 'green';
                    icon = '▲';
                } else if (sumData_positive < 0) {
                    iconColor = 'red';
                    icon = '▼';
                }

                if (sumData_positive !== 0) {

                    absSumData = Math.abs(sumData_positive).toFixed(2);
                    if (absSumData.endsWith(".50")) {
                        absSumData = absSumData.slice(0, -1);
                    }
                    insertElement_positive.setAttribute('data-0', sumData_positive.toFixed(2));
                } else {
                    absSumData = "-";
                }

                const iconElement = document.createElement('span');
                iconElement.style.color = iconColor;
                iconElement.textContent = icon;

                const absSumDataText = document.createTextNode(absSumData);

                insertElement_positive.innerHTML = '';
                insertElement_positive.appendChild(absSumDataText);

                if (icon !== '') {
                    insertElement_positive.appendChild(iconElement);
                }

            }

            if (insertElement_minus) {
                let iconColor = 'transparent';
                let icon = '';
                let absSumData = '0';

                if (sumData_minus < 0) {
                    iconColor = 'green';
                    icon = '▲';
                } else if (sumData_minus > 0) {
                    iconColor = 'red';
                    icon = '▼';
                }

                if (sumData_minus !== 0) {
                    absSumData = Math.abs(sumData_minus).toFixed(2);
                    if (absSumData.endsWith(".50")) {
                        absSumData = absSumData.slice(0, -1);
                    }
                    insertElement_minus.setAttribute('data-0', (sumData_minus).toFixed(2));
                } else {
                    absSumData = "-";
                }

                const iconElement = document.createElement('span');
                iconElement.style.color = iconColor;
                iconElement.textContent = icon;

                const absSumDataText = document.createTextNode(absSumData);

                insertElement_minus.innerHTML = '';
                insertElement_minus.appendChild(absSumDataText);

                if (icon !== '') {
                    insertElement_minus.appendChild(iconElement);
                }
            }


            if (insertTips) {
                let checkTip = '';
                let checkName = ''

                if (checkTipsDataHome > 0) {
                    checkTip = `${home.textContent}  ${oddHome < 0 ? `${oddHome}` : `+${oddHome}`}`;
                    checkName = `${home.textContent}`;
                } else if (checkTipsDataAway > 0) {
                    checkTip = `${away.textContent} ${oddAway < 0 ? `${oddAway}` : `+${oddAway}`}`;
                    checkName = `${away.textContent}`;
                }

                insertTips.innerHTML = checkTip;
                setTipHandicap(checkTip);
                setTipHandicapName(checkName);
            }

            if (insertTipsOU) {
                const checkTip = checkTipsDataOU < 0 ? `Over ${oddOU}` : checkTipsDataOU > 0 ? `Under ${oddOU}` : '';
                const checkName = checkTipsDataOU < 0 ? `Over` : checkTipsDataOU > 0 ? `Under` : '';

                insertTipsOU.innerHTML = checkTip;
                setTipOU(checkTip)
                setTipOUName(checkName)
            }


        };

        // const insertData = (tr, data) => {
        //     const { elementId, sumData } = data;
        //     const insertElement = tr.querySelector(elementId);

        //     if (insertElement) {
        //         const icon = sumData < 0 ? `${<ArrowDropUpIcon />}` : `${<ArrowDropDownIcon />}`;
        //         const absSumData = Math.abs(sumData).toFixed(2);

        //         insertElement.innerHTML = absSumData + icon;
        //     }
        // };

        const Odd = async () => {
            const tr = document.getElementById("tr_" + e.MATCH_ID);
            let checkTip = '';
            if (tr !== null) {
                const dataToInsert = [
                    {
                        elementIdGoal: `#goal_${e.MATCH_ID}`,
                        liveElementIdGoalLive: `#goalLive_${e.MATCH_ID}`
                    },
                    {
                        elementId_positive: `#insertGoal_${e.MATCH_ID}`,
                        sumData_positive: await sreachOdd(`#goalEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_${e.MATCH_ID}`, tr),

                    },
                    {
                        elementId_positive: `#insertGoalLive_${e.MATCH_ID}`,
                        sumData_positive: await sreachOdd(`#goalEarlyLive_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),

                    },
                    {
                        elementId_minus: `#insertUpOdd_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#upoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertDownOdd_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#downoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_${e.MATCH_ID}`, tr),
                    },
                    /* Over/Under */
                    {
                        elementId_positive: `#insertGoal_t1_${e.MATCH_ID}`,
                        // sumData_positive: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        sumData_positive: await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr),
                        // checkTipsData: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertUpodds_t_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#upoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_t_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertDownodds_t_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#downoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_t_${e.MATCH_ID}`, tr),
                    },
                    {
                        tip: `#tip_${e.MATCH_ID}`,
                        homeID: `#home_${e.MATCH_ID}`,
                        awayID: `#away_${e.MATCH_ID}`,
                        oddHome: await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                        oddAway: await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),
                        checkTipsDataHome: await sreachOdd(`#goalEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                        checkTipsDataAway: await sreachOdd(`#goalEarlyLive_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),
                    },
                    {
                        tipOU: `#tipOU_${e.MATCH_ID}`,
                        oddOU: await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        checkTipsDataOU: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                    }
                ];

                for (const data of dataToInsert) {
                    await insertData(tr, data);
                }
            }
        }

        Odd();
        const intervalIdOdds = setInterval(Odd, 5000);

        return () => {
            clearInterval(intervalIdOdds);
        };

    }, []);

    // odd 
    const oddsKeys = ['handicap', 'europe', 'overUnder'];
    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            return {};
        }
    };


    const parsedOdds = oddsKeys.reduce((acc, key) => {
        if (odds && odds.$ && odds.$[key]) {
            acc[key] = parseJSON(odds.$[key]);
        }
        return acc;
    }, {});
    const { handicap, europe, overUnder } = parsedOdds;

    const matchTime = new Date(matchedScheduleEmitItem?.HALF_START_TIME * 1000);
    matchTime.setHours(matchTime.getHours() + 7);
    const newTimestamp = matchTime.getTime() / 1000;

    return (
        <tr
            matchid={e.MATCH_ID}
            id={`tr_${e.MATCH_ID}`}
            team={((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) ? `meAway_${e.MATCH_ID}` : "" : (-handicap?.INSTANT_HANDICAP) ? `meHome_${e.MATCH_ID}` : "")}
            odds={JSON.stringify(e)}
            chOdds={handicap?.INITIAL_HANDICAP}
            status_s={matchedScheduleEmitItem?.STATUS ? matchedScheduleEmitItem?.STATUS <= 0 ? "start" : "live" : e?.STATUS <= 0 ? "start" : "live"}
            data-s={matchedScheduleEmitItem?.STATUS ? matchedScheduleEmitItem?.STATUS : e?.STATUS}
            data-t={JSON.stringify(matchedScheduleEmitItem) ? JSON.stringify(matchedScheduleEmitItem) : ""}
            data-tipAH={tipHandicapName}
            data-tipOU={tipOUName}
        >
            <td className="td-time" style={{ width: '5%', textAlign: 'center' }} >
                {matchedScheduleEmitItem?.STATUS > 0 ? (
                    <>
                        <div className="time_inmatch" style={{ paddingBottom: '12px' }}>
                            <span id={'ms' + e.MATCH_ID} className="red" style={{ marginTop: "5px" }} dangerouslySetInnerHTML={{ __html: funcTimeRun(matchedScheduleEmitItem?.STATUS, newTimestamp) }}></span>
                        </div>
                        <div className="time_local" >
                            <span style={{ fontWeight: 'initial', color: 'rgb(128, 128, 128)' }} dangerouslySetInnerHTML={{ __html: UTCtoLocalTimeTool1(e.MATCH_TIME, 0) }}></span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="time_local" >
                            <span style={{ fontWeight: 'initial', color: 'rgb(128, 128, 128)' }} dangerouslySetInnerHTML={{ __html: UTCtoLocalTimeTool1(e.MATCH_TIME, 0) }}></span>
                        </div>
                    </>
                )}
            </td>
            <td className="td-league" style={{ textAlign: 'center' }}>{e.LEAGUE_SHORT_NAME}</td>
            <td className="td-match" style={{ paddingLeft: '10px', fontWeight: 'bold' }}>
                <div>
                    <p id={`home_${e.MATCH_ID}`} className={((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) : (-handicap?.INSTANT_HANDICAP) ? `me_color` : "")}>{e.HOME_NAME}</p>
                    <p id={`away_${e.MATCH_ID}`} className={((handicap?.INSTANT_HANDICAP) < 0 ? (handicap?.INSTANT_HANDICAP) ? `me_color` : "" : (handicap?.INSTANT_HANDICAP))}>{e.AWAY_NAME}</p>
                </div>
            </td>
            <td className="td-handicap-live">
                <div className="tr__row">
                    {matchedHandicapItem?.INSTANT_HANDICAP ? (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" odd_goal={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (-matchedHandicapItem?.INSTANT_HANDICAP) : (-matchedHandicapItem?.INSTANT_HANDICAP))} id={`goal_${e.MATCH_ID}`}>
                                <span>
                                    {((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (-matchedHandicapItem?.INSTANT_HANDICAP) : (-matchedHandicapItem?.INSTANT_HANDICAP))}
                                </span>
                            </div>

                            <div className="tr__col handicap.instantHandicap" odd_goalLive={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (matchedHandicapItem?.INSTANT_HANDICAP) : (matchedHandicapItem?.INSTANT_HANDICAP))} id={`goalLive_${e.MATCH_ID}`}>
                                <span>
                                    {((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (matchedHandicapItem?.INSTANT_HANDICAP) : (matchedHandicapItem?.INSTANT_HANDICAP))}
                                </span>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHandicap" odd_goal={((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) : (-handicap?.INSTANT_HANDICAP))} id={`goal_${e.MATCH_ID}`}>
                                <span>
                                    {((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) : (-handicap?.INSTANT_HANDICAP))}
                                </span>
                            </div>

                            <div className="tr__col handicap.instantHandicap" odd_goalLive={((handicap?.INSTANT_HANDICAP) < 0 ? (handicap?.INSTANT_HANDICAP) : (handicap?.INSTANT_HANDICAP))} id={`goalLive_${e.MATCH_ID}`}>
                                <span>
                                    {((handicap?.INSTANT_HANDICAP) < 0 ? (handicap?.INSTANT_HANDICAP) : (handicap?.INSTANT_HANDICAP))}
                                </span>
                            </div>
                        </React.Fragment>
                    )}

                </div>
            </td>
            <td>
                <div className="tr__row">
                    {matchedHandicapItem?.INSTANT_HOME || matchedHandicapItem?.INSTANT_AWAY ? (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHome" id={`upodds_${e.MATCH_ID}`}>{formatNumber(matchedHandicapItem?.INSTANT_HOME)}</div>
                            <div className="tr__col handicap.instantAway" id={`downodds_${e.MATCH_ID}`}>{formatNumber(matchedHandicapItem?.INSTANT_AWAY)}</div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="tr__col handicap.instantHome" id={`upodds_${e.MATCH_ID}`}>{formatNumber(handicap?.INSTANT_HOME)}</div>
                            <div className="tr__col handicap.instantAway" id={`downodds_${e.MATCH_ID}`}>{formatNumber(handicap?.INSTANT_AWAY)}</div>
                        </React.Fragment>
                    )}
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.initialHandicap" id={`goalEarly_${e.MATCH_ID}`}><span>{(handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (-handicap?.INITIAL_HANDICAP)}</span></div>
                    <div className="tr__col handicap.initialHandicap" id={`goalEarlyLive_${e.MATCH_ID}`}><span>{(handicap?.INITIAL_HANDICAP) < 0 ? (handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP)}</span></div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col handicap.initialHome" id={`upoddsEarly_${e.MATCH_ID}`}>{formatNumber(handicap?.INITIAL_HOME)}</div>
                    <div className="tr__col handicap.initialAway" id={`downoddsEarly_${e.MATCH_ID}`}>{formatNumber(handicap?.INITIAL_AWAY)}</div>
                </div>
            </td>


            <td className="td-handicap-bd-live">
                <div className="tr__row_remove">
                    <div className="tr__col handicap.initialHandicap-handicap.instantHandicap" id={`insertGoal_${e.MATCH_ID}`}></div>
                    <div className="tr__col el--up handicap.initialHandicap.-handicap.instantHandicap" id={`insertGoalLive_${e.MATCH_ID}`}><span></span></div>
                </div>
            </td>
            <td className="td-handicap-odds-bd">
                <div className="tr__row">
                    <div className="tr__col handicap.initialHome-handicap.instantHome" id={`insertUpOdd_${e.MATCH_ID}`}></div>
                    <div className="tr__col handicap.initialAway-handicap.instantAway" id={`insertDownOdd_${e.MATCH_ID}`}></div>
                </div>
            </td>


            <td className="td-handicap-tips">
                <div className="tr__row_remove">
                    <div className="tr__col handicap.fluctuatingHandicap" style={{ fontWeight: 'bold' }} id={`tip_${e.MATCH_ID}`}></div>
                </div>
            </td>
            <td>
                <div className="tr__row_remove">
                    {matchedOverItem?.INSTANT_HANDICAP ? (
                        <React.Fragment>
                            <div className="tr__col overUnder.instantHandicap" id={`goal_t1_${e.MATCH_ID}`}>{(matchedOverItem?.INSTANT_HANDICAP)}</div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="tr__col overUnder.instantHandicap" id={`goal_t1_${e.MATCH_ID}`}>{(overUnder?.INSTANT_HANDICAP)}</div>
                        </React.Fragment>
                    )}

                </div>
            </td>
            <td>
                <div className="tr__row">
                    {matchedOverItem?.INSTANT_OVER || matchedOverItem?.INSTANT_UNDER ? (
                        <React.Fragment>
                            <div className="tr__col overUnder.instantOver" id={`upodds_t_${e.MATCH_ID}`}>{formatNumber(matchedOverItem?.INSTANT_OVER)}</div>
                            <div className="tr__col overUnder.instantUnder" id={`downodds_t_${e.MATCH_ID}`}>{formatNumber(matchedOverItem?.INSTANT_UNDER)}</div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="tr__col overUnder.instantOver" id={`upodds_t_${e.MATCH_ID}`}>{formatNumber(overUnder?.INSTANT_OVER)}</div>
                            <div className="tr__col overUnder.instantUnder" id={`downodds_t_${e.MATCH_ID}`}>{formatNumber(overUnder?.INSTANT_UNDER)}</div>
                        </React.Fragment>
                    )}

                </div>
            </td>
            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.initialHandicap" id={`goalEarly_t1_${e.MATCH_ID}`}>{(overUnder?.INITIAL_HANDICAP)}</div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.initialOver" id={`upoddsEarly_t_${e.MATCH_ID}`}>{formatNumber(overUnder?.INITIAL_OVER)}</div>
                    <div className="tr__col overUnder.initialUnder" id={`downoddsEarly_t_${e.MATCH_ID}`}>{formatNumber(overUnder?.INITIAL_UNDER)}</div>
                </div>
            </td>

            {/* live  */}

            <td>
                <div className="tr__row_remove">
                    <div className="tr__col overUnder.initialHandicap - overUnder.instantHandicap" id={`insertGoal_t1_${e.MATCH_ID}`}></div>
                </div>
            </td>
            <td>
                <div className="tr__row">
                    <div className="tr__col overUnder.initialOver - overUnder.instantOver" id={`insertUpodds_t_${e.MATCH_ID}`}></div>
                    <div className="tr__col overUnder.initialUnder - overUnder.instantUnder" id={`insertDownodds_t_${e.MATCH_ID}`}></div>
                </div>
            </td>
            {/* live  */}
            <td className="td-overunder-tip">
                <div className="tr__col handicap.fluctuatingHandicap" style={{ fontWeight: 'bold' }} id={`tipOU_${e.MATCH_ID}`}></div>
            </td>
            <td >
                <div className="td-viewfull" style={{ display: 'grid', padding: '0px 5px 0 5px' }}>
                    <button style={{ marginBottom: '5px', cursor: 'pointer', }} onClick={handleViewClickButton}>View</button>
                </div>
            </td>
        </tr>
    );
};

export default DataTable;